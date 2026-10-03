type TerminalRuntime = "ftxui" | "ncurses" | "ratatui" | "cli";

interface TerminalProgramSource {
    jsSource: string;
    wasmSource: string;
}

interface TerminalSurface {
    readonly cols: number;
    readonly rows: number;
    write(data: string | Uint8Array): void;
}

interface TerminalAdapterSession {
    readonly isFinished: boolean;
    input(data: string): void;
    resize(cols: number, rows: number): void;
    stop(): void;
}

interface TerminalAdapter {
    start(terminal: TerminalSurface, source: TerminalProgramSource): TerminalAdapterSession;
}

type TerminalAdapterSchema = Partial<Record<TerminalRuntime, TerminalAdapter>>;

interface TerminalAdapterBindings {
    onReady: (terminal: TerminalSurface) => void;
    onData: (data: string) => void;
    onResize: (cols: number, rows: number) => void;
}

export type {
    TerminalRuntime,
    TerminalProgramSource,
    TerminalSurface,
    TerminalAdapterSession,
    TerminalAdapter,
    TerminalAdapterSchema,
    TerminalAdapterBindings
};
