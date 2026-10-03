import { OutputBatcher } from "../lib/OutputBatcher.ts";
import { EmscriptenSession } from "./EmscriptenSession.ts";

import type { EmscriptenRuntime, EmscriptenTtyOps } from "../model/emscripten-types.ts";
import type { TerminalProgramSource, TerminalSurface } from "../model/types.ts";


const TTY_NOT_EXPORTED =
    "ncurses adapter needs the TTY runtime object; add TTY to EXPORTED_RUNTIME_METHODS";

interface TerminalSize {
    cols: number;
    rows: number;
}

class NcursesSession extends EmscriptenSession {
    readonly #output: OutputBatcher;
    #size: TerminalSize;

    constructor(terminal: TerminalSurface, source: TerminalProgramSource) {
        super(terminal, source);
        this.#output = new OutputBatcher(terminal);
        this.#size = { cols: terminal.cols, rows: terminal.rows };
    }

    override resize(cols: number, rows: number): void {
        this.#size = { cols, rows };
    }

    override stop(): void {
        super.stop();
        this.#output.close();
    }

    protected override attach(runtime: EmscriptenRuntime): void {
        if (runtime.TTY === undefined) {
            throw new Error(TTY_NOT_EXPORTED);
        }

        const ttyOps: EmscriptenTtyOps = {
            get_char: this.inputQueue.read,
            put_char: this.#writeByte.bind(this),
            fsync: this.#output.flush,
            ioctl_tiocgwinsz: this.#measure.bind(this),
        };
        Object.assign(runtime.TTY.default_tty_ops, ttyOps);
        Object.assign(runtime.TTY.default_tty1_ops, ttyOps);
    }

    protected override flushOutput(): void {
        this.#output.flush();
    }

    #writeByte(_tty: unknown, byte: number | null): void {
        if (byte !== null && byte !== 0) {
            this.#output.push(byte);
        }
    }

    #measure(): [number, number] {
        return [this.#size.rows, this.#size.cols];
    }
}

export { NcursesSession };
