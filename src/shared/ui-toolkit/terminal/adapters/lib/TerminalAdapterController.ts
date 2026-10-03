import { clearScreen, reportFailure } from "./terminal-messages.ts";

import type {
    TerminalAdapterBindings,
    TerminalAdapterSession,
    TerminalProgramSource,
    TerminalRuntime,
    TerminalSurface
} from "../model/types.ts";
import type { TerminalAdapterRegistry } from "../TerminalAdapterRegistry.ts";


const ENTER_KEY_PATTERN = /[\r\n]/;

interface TerminalAdapterTarget {
    runtime: TerminalRuntime;
    source: TerminalProgramSource;
    registry: TerminalAdapterRegistry;
}

class TerminalAdapterController {
    readonly bindings: TerminalAdapterBindings;
    #target: TerminalAdapterTarget | null = null;
    #session: TerminalAdapterSession | null = null;
    #terminal: TerminalSurface | null = null;

    constructor() {
        this.bindings = {
            onReady: this.#start.bind(this),
            onData: this.#input.bind(this),
            onResize: this.#resize.bind(this),
        };
        this.stop = this.stop.bind(this);
    }

    configure(target: TerminalAdapterTarget): void {
        this.#target = target;
    }

    stop(): void {
        this.#session?.stop();
        this.#session = null;
    }

    #start(terminal: TerminalSurface): void {
        this.#terminal = terminal;
        this.#launch(terminal);
    }

    #launch(terminal: TerminalSurface): void {
        this.stop();
        if (this.#target === null) {
            return;
        }

        const { registry, runtime, source } = this.#target;
        try {
            this.#session = registry.resolve(runtime).start(terminal, source);
        } catch (error) {
            reportFailure(terminal, error);
        }
    }

    #restart(terminal: TerminalSurface): void {
        clearScreen(terminal);
        this.#launch(terminal);
    }

    #input(data: string): void {
        if (this.#session?.isFinished !== true) {
            this.#session?.input(data);
            return;
        }

        if (this.#terminal !== null && ENTER_KEY_PATTERN.test(data)) {
            this.#restart(this.#terminal);
        }
    }

    #resize(cols: number, rows: number): void {
        this.#session?.resize(cols, rows);
    }
}

export { TerminalAdapterController };
export type { TerminalAdapterTarget };
