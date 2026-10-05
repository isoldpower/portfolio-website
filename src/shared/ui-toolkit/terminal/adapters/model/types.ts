type TerminalRuntime = "ftxui" | "ncurses" | "ratatui" | "cli";

interface TerminalProgramSource {
    jsSource: string;
    wasmSource: string;
}

interface TerminalMouseModes {
    mouseTracking?(): number;
    mouseEncoding?(): string | null;
    mouseSgr?(): boolean;
}

interface TerminalSurface {
    readonly cols: number;
    readonly rows: number;
    readonly element: HTMLElement;
    readonly bridge: TerminalMouseModes | null;
    write(data: string | Uint8Array): void;
}

interface TerminalAdapterSession {
    readonly isFinished: boolean;
    input(data: string): void;
    resize(cols: number, rows: number): void;
    stop(): void;
}

interface TerminalAdapter {
    readonly virtualKeyboard?: boolean;
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
    TerminalMouseModes,
    TerminalSurface,
    TerminalAdapterSession,
    TerminalAdapter,
    TerminalAdapterSchema,
    TerminalAdapterBindings
};
