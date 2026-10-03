import { ControlStringFilter } from "../lib/ControlStringFilter.ts";
import { EmscriptenSession } from "./EmscriptenSession.ts";

import type { EmscriptenProgram, EmscriptenRuntime } from "../model/emscripten-types.ts";
import type { TerminalProgramSource, TerminalSurface } from "../model/types.ts";


const FRAME_END_BYTE = 0;
const RESIZE_EXPORT = "_ftxui_on_resize";
const INTERRUPT_KEY = "\x03";
const LEAVE_ALTERNATE_SCREEN = "\x1b[?1049l";

type ResizeHook = (cols: number, rows: number) => void;

interface TerminalSize {
    cols: number;
    rows: number;
}

function resolveResizeHook(program: EmscriptenProgram): ResizeHook {
    const hook = program[RESIZE_EXPORT];
    if (typeof hook !== "function") {
        throw new Error(`FTXUI program does not export ${RESIZE_EXPORT}; add it to EXPORTED_FUNCTIONS`);
    }

    return hook as ResizeHook;
}

class FtxuiSession extends EmscriptenSession {
    readonly #frame: number[] = [];
    readonly #controlStrings = new ControlStringFilter();
    readonly #decoder = new TextDecoder();
    #isInterruptPending = false;
    #size: TerminalSize;
    #resizeProgram: ResizeHook | null = null;

    constructor(terminal: TerminalSurface, source: TerminalProgramSource) {
        super(terminal, source);
        this.#size = { cols: terminal.cols, rows: terminal.rows };
    }

    override input(data: string): void {
        if (data.includes(INTERRUPT_KEY)) {
            this.#isInterruptPending = true;
        }

        super.input(data);
    }

    override resize(cols: number, rows: number): void {
        this.#size = { cols, rows };
        this.#applySize();
    }

    protected override attach(runtime: EmscriptenRuntime): void {
        runtime.FS.init(this.inputQueue.read, this.#writeByte.bind(this), null);
    }

    protected override handleLoaded(program: EmscriptenProgram): void {
        this.#resizeProgram = resolveResizeHook(program);
        this.#applySize();
    }

    #writeByte(byte: number | null): void {
        if (byte === null) {
            return;
        }
        if (byte !== FRAME_END_BYTE) {
            this.#controlStrings.push(byte, this.#frame);
            return;
        }

        const frame = new Uint8Array(this.#frame);
        if (!this.isStopped) {
            this.terminal.write(frame);
        }
        if (this.#isInterruptPending && this.#leavesAlternateScreen(frame)) {
            this.handleInterrupt();
        }

        this.#frame.length = 0;
    }

    #leavesAlternateScreen(frame: Uint8Array): boolean {
        return this.#decoder.decode(frame).includes(LEAVE_ALTERNATE_SCREEN);
    }

    #applySize(): void {
        if (this.#resizeProgram !== null && !this.hasExited && !this.isStopped) {
            this.#resizeProgram(this.#size.cols, this.#size.rows);
        }
    }
}

export { FtxuiSession };
