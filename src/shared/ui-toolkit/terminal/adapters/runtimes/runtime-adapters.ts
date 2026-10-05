import { CliSession } from "./CliSession.ts";
import { FtxuiSession } from "./FtxuiSession.ts";
import { NcursesSession } from "./NcursesSession.ts";

import type {
    TerminalAdapter,
    TerminalAdapterSession,
    TerminalProgramSource,
    TerminalSurface
} from "../model/types.ts";


function startFtxuiSession(terminal: TerminalSurface, source: TerminalProgramSource): TerminalAdapterSession {
    return new FtxuiSession(terminal, source).start();
}

function startNcursesSession(terminal: TerminalSurface, source: TerminalProgramSource): TerminalAdapterSession {
    return new NcursesSession(terminal, source).start();
}

function startCliSession(terminal: TerminalSurface, source: TerminalProgramSource): TerminalAdapterSession {
    return new CliSession(terminal, source).start();
}

const ftxuiAdapter: TerminalAdapter = { start: startFtxuiSession, virtualKeyboard: false };
const ncursesAdapter: TerminalAdapter = { start: startNcursesSession, virtualKeyboard: false };
const cliAdapter: TerminalAdapter = { start: startCliSession };

export { ftxuiAdapter, ncursesAdapter, cliAdapter };
