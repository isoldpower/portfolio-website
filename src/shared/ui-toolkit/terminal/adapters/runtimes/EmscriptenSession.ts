import { InputQueue } from "../lib/InputQueue.ts";
import { loadEmscriptenProgram } from "../lib/load-emscripten-program.ts";
import {
    reportAborted,
    reportFailure,
    reportFinished,
    reportInterrupted
} from "../lib/terminal-messages.ts";

import type { EmscriptenProgram, EmscriptenRuntime } from "../model/emscripten-types.ts";
import type { TerminalAdapterSession, TerminalProgramSource, TerminalSurface } from "../model/types.ts";


type TerminationReport = (terminal: TerminalSurface) => void;

abstract class EmscriptenSession implements TerminalAdapterSession {
    protected readonly terminal: TerminalSurface;
    protected readonly inputQueue = new InputQueue();
    protected isStopped = false;
    protected hasExited = false;
    readonly #source: TerminalProgramSource;

    constructor(terminal: TerminalSurface, source: TerminalProgramSource) {
        this.terminal = terminal;
        this.#source = source;
    }

    get isFinished(): boolean {
        return this.hasExited;
    }

    start(): this {
        loadEmscriptenProgram(this.#source, {
            preRun: [this.attach.bind(this)],
            onExit: this.handleExit.bind(this),
            onAbort: this.handleAbort.bind(this),
        })
            .then(this.handleLoaded.bind(this))
            .catch(this.handleFailure.bind(this));

        return this;
    }

    input(data: string): void {
        if (!this.isStopped) {
            this.inputQueue.push(data);
        }
    }

    resize(_cols: number, _rows: number): void {}

    stop(): void {
        this.isStopped = true;
        this.inputQueue.clear();
    }

    protected abstract attach(runtime: EmscriptenRuntime): void;

    protected handleLoaded(_program: EmscriptenProgram): void {}

    protected flushOutput(): void {}

    protected handleExit(): void {
        this.#terminate(reportFinished);
    }

    protected handleAbort(): void {
        this.#terminate(reportAborted);
    }

    protected handleInterrupt(): void {
        this.#terminate(reportInterrupted);
    }

    protected handleFailure(error: unknown): void {
        if (!this.isStopped && !this.hasExited) {
            reportFailure(this.terminal, error);
        }
    }

    #terminate(report: TerminationReport): void {
        if (this.hasExited) {
            return;
        }

        this.hasExited = true;
        this.flushOutput();
        if (!this.isStopped) {
            report(this.terminal);
        }
    }
}

export { EmscriptenSession };
