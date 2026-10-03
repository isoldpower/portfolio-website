class UnknownTerminalRuntimeError extends Error {
    readonly runtime: string;

    constructor(runtime: string) {
        super(`No terminal adapter is registered for runtime "${runtime}"`);
        this.name = "UnknownTerminalRuntimeError";
        this.runtime = runtime;
    }
}

export { UnknownTerminalRuntimeError };
