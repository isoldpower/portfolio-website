import type { TerminalSurface } from "../model/types.ts";


class OutputBatcher {
    readonly #terminal: TerminalSurface;
    readonly #pending: number[] = [];
    #scheduledFrame: number | null = null;
    #isClosed = false;

    constructor(terminal: TerminalSurface) {
        this.#terminal = terminal;
        this.flush = this.flush.bind(this);
    }

    push(byte: number): void {
        this.#pending.push(byte);
        this.#scheduledFrame ??= requestAnimationFrame(this.flush);
    }

    flush(): void {
        this.#scheduledFrame = null;
        if (!this.#isClosed && this.#pending.length > 0) {
            this.#terminal.write(new Uint8Array(this.#pending));
        }
        this.#pending.length = 0;
    }

    close(): void {
        this.#isClosed = true;
        if (this.#scheduledFrame !== null) {
            cancelAnimationFrame(this.#scheduledFrame);
            this.#scheduledFrame = null;
        }
    }
}

export { OutputBatcher };
