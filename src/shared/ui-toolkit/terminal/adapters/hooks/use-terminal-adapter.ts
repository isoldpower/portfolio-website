import { useEffect, useState } from "react";

import { defaultTerminalAdapters } from "../default-terminal-adapters.ts";
import { TerminalAdapterController } from "../lib/TerminalAdapterController.ts";

import type {
    TerminalAdapterBindings,
    TerminalProgramSource,
    TerminalRuntime
} from "../model/types.ts";
import type { TerminalAdapterRegistry } from "../TerminalAdapterRegistry.ts";


const useTerminalAdapter = (
    runtime: TerminalRuntime,
    source: TerminalProgramSource,
    registry: TerminalAdapterRegistry = defaultTerminalAdapters
): TerminalAdapterBindings => {
    const [controller] = useState<TerminalAdapterController>(() => {
        return new TerminalAdapterController();
    });

    useEffect(() => {
        controller.configure({ runtime, source, registry });
    }, [controller, runtime, source, registry]);

    useEffect(() => {
        return controller.stop;
    }, [controller]);

    return controller.bindings;
};

export { useTerminalAdapter };
