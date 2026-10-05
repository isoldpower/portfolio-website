import { LetterKeyForwarder } from "./LetterKeyForwarder.ts";
import { ScrollForwarder } from "./ScrollForwarder.ts";
import { clearScreen, reportFailure } from "./terminal-messages.ts";
import { setVirtualKeyboard } from "./virtual-keyboard.ts";

import type {
    TerminalAdapterBindings,
    TerminalAdapterSession,
    TerminalProgramSource,
    TerminalRuntime,
    TerminalSurface
} from "../model/types.ts";
import type { TerminalAdapterRegistry } from "../TerminalAdapterRegistry.ts";


const ENTER_KEY_PATTERN = /[\r\n]/;

interface InputForwarder {
    detach(): void;
}

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
    #forwarders: InputForwarder[] = [];

    constructor() {
        this.bindings = {
            onReady: this.#start.bind(this),
            onData: this.#input.bind(this),
            onResize: this.#resize.bind(this),
        };
        this.stop = this.stop.bind(this);
        this.dispose = this.dispose.bind(this);
    }

    configure(target: TerminalAdapterTarget): void {
        this.#target = target;
    }

    stop(): void {
        this.#session?.stop();
        this.#session = null;
    }

    dispose(): void {
        this.stop();
        this.#detachForwarders();
    }

    #start(terminal: TerminalSurface): void {
        this.#terminal = terminal;
        this.#detachForwarders();
        this.#forwarders = [
            new ScrollForwarder(terminal, this.bindings.onData).attach(),
            new LetterKeyForwarder(terminal, this.bindings.onData).attach(),
        ];
        this.#launch(terminal);
    }

    #detachForwarders(): void {
        for (const forwarder of this.#forwarders) {
            forwarder.detach();
        }
        this.#forwarders = [];
    }

    #launch(terminal: TerminalSurface): void {
        this.stop();
        if (this.#target === null) {
            return;
        }

        const { registry, runtime, source } = this.#target;
        try {
            const adapter = registry.resolve(runtime);
            setVirtualKeyboard(terminal, adapter.virtualKeyboard ?? true);
            this.#session = adapter.start(terminal, source);
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
