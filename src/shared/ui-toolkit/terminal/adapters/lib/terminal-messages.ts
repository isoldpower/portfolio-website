import type { TerminalSurface } from "../model/types.ts";


const FINISHED_MESSAGE = "\r\n[program finished — press Enter to run it again]\r\n";
const ABORTED_MESSAGE = "\r\n[program aborted — press Enter to run it again]\r\n";
const INTERRUPTED_MESSAGE = "\r\n[program interrupted — press Enter to run it again]\r\n";
const CLEAR_SCREEN = "\x1b[0m\x1b[2J\x1b[3J\x1b[H";
const FAILED_MESSAGE = "\r\n[program failed to load]\r\n";
const NOT_ISOLATED_HINT =
    "This page is not cross-origin isolated, which threaded builds need:\r\n" +
    "serve it with Cross-Origin-Opener-Policy: same-origin and\r\n" +
    "Cross-Origin-Embedder-Policy: require-corp.\r\n";

function reportFinished(terminal: TerminalSurface): void {
    terminal.write(FINISHED_MESSAGE);
}

function reportAborted(terminal: TerminalSurface): void {
    terminal.write(ABORTED_MESSAGE);
}

function reportInterrupted(terminal: TerminalSurface): void {
    terminal.write(INTERRUPTED_MESSAGE);
}

function clearScreen(terminal: TerminalSurface): void {
    terminal.write(CLEAR_SCREEN);
}

function reportFailure(terminal: TerminalSurface, error: unknown): void {
    console.error(error);
    terminal.write(FAILED_MESSAGE);

    if (!globalThis.crossOriginIsolated) {
        terminal.write(NOT_ISOLATED_HINT);
    }
}

export { clearScreen, reportAborted, reportFinished, reportFailure, reportInterrupted };
