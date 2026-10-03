import { cliAdapter, ftxuiAdapter, ncursesAdapter } from "./runtimes/runtime-adapters.ts";
import { TerminalAdapterRegistry } from "./TerminalAdapterRegistry.ts";


const defaultTerminalAdapters = new TerminalAdapterRegistry({
    ftxui: ftxuiAdapter,
    ncurses: ncursesAdapter,
    cli: cliAdapter,
});

export { defaultTerminalAdapters };
