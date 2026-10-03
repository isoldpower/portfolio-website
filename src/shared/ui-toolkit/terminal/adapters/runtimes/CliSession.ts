import { OutputBatcher } from "../lib/OutputBatcher.ts";
import { EmscriptenSession } from "./EmscriptenSession.ts";

import type { EmscriptenRuntime } from "../model/emscripten-types.ts";
import type { TerminalProgramSource, TerminalSurface } from "../model/types.ts";


const LINE_FEED = 10;
const CARRIAGE_RETURN = 13;
const ESCAPE = "\x1b";
const END_OF_TRANSMISSION = "\x04";
const ERASE_KEYS = new Set(["\x7f", "\b"]);
const ENTER_KEYS = new Set(["\r", "\n"]);
const FIRST_PRINTABLE = " ";

class CliSession extends EmscriptenSession {
    readonly #output: OutputBatcher;
    #line: string[] = [];
    #hasInputEnded = false;

    constructor(terminal: TerminalSurface, source: TerminalProgramSource) {
        super(terminal, source);
        this.#output = new OutputBatcher(terminal);
    }

    override input(data: string): void {
        if (this.isStopped || data.startsWith(ESCAPE)) {
            return;
        }

        for (const key of data) {
            this.#handleKey(key);
        }
    }

    override stop(): void {
        super.stop();
        this.#output.close();
    }

    protected override attach(runtime: EmscriptenRuntime): void {
        const writeByte = this.#writeByte.bind(this);
        runtime.FS.init(this.#readByte.bind(this), writeByte, writeByte);
    }

    protected override flushOutput(): void {
        this.#output.flush();
    }

    #readByte(): number | null | undefined {
        const byte = this.inputQueue.read();
        if (byte === undefined && this.#hasInputEnded) {
            return null;
        }

        return byte;
    }

    #writeByte(byte: number | null): void {
        if (byte === null) {
            return;
        }
        if (byte === LINE_FEED) {
            this.#output.push(CARRIAGE_RETURN);
        }
        this.#output.push(byte);
    }

    #handleKey(key: string): void {
        if (ENTER_KEYS.has(key)) {
            this.#submitLine();
        } else if (ERASE_KEYS.has(key)) {
            this.#eraseKey();
        } else if (key === END_OF_TRANSMISSION) {
            this.#endInput();
        } else if (key >= FIRST_PRINTABLE) {
            this.#typeKey(key);
        }
    }

    #submitLine(): void {
        this.terminal.write("\r\n");
        this.inputQueue.push(`${this.#line.join("")}\n`);
        this.#line = [];
    }

    #eraseKey(): void {
        if (this.#line.length > 0) {
            this.#line = this.#line.slice(0, -1);
            this.terminal.write("\b \b");
        }
    }

    #endInput(): void {
        if (this.#line.length === 0) {
            this.#hasInputEnded = true;
        }
    }

    #typeKey(key: string): void {
        this.#line.push(key);
        this.terminal.write(key);
    }
}

export { CliSession };
