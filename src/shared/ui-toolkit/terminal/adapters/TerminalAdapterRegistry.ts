import { UnknownTerminalRuntimeError } from "./UnknownTerminalRuntimeError.ts";

import type { TerminalAdapter, TerminalAdapterSchema, TerminalRuntime } from "./model/types.ts";


class TerminalAdapterRegistry {
    readonly #schema: TerminalAdapterSchema;

    constructor(schema: TerminalAdapterSchema) {
        this.#schema = schema;
    }

    has(runtime: TerminalRuntime): boolean {
        return this.#schema[runtime] !== undefined;
    }

    resolve(runtime: TerminalRuntime): TerminalAdapter {
        const adapter = this.#schema[runtime];
        if (adapter === undefined) {
            throw new UnknownTerminalRuntimeError(runtime);
        }

        return adapter;
    }
}

export { TerminalAdapterRegistry };
