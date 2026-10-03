export { useTerminalAdapter } from "./hooks/use-terminal-adapter.ts";
export { TerminalAdapterController } from "./lib/TerminalAdapterController.ts";
export { TerminalAdapterRegistry } from "./TerminalAdapterRegistry.ts";
export { UnknownTerminalRuntimeError } from "./UnknownTerminalRuntimeError.ts";
export { defaultTerminalAdapters } from "./default-terminal-adapters.ts";
export { cliAdapter, ftxuiAdapter, ncursesAdapter } from "./runtimes/runtime-adapters.ts";
export { EmscriptenSession } from "./runtimes/EmscriptenSession.ts";

export type { TerminalAdapterTarget } from "./lib/TerminalAdapterController.ts";
export type {
    TerminalRuntime,
    TerminalProgramSource,
    TerminalSurface,
    TerminalAdapterSession,
    TerminalAdapter,
    TerminalAdapterSchema,
    TerminalAdapterBindings
} from "./model/types.ts";
