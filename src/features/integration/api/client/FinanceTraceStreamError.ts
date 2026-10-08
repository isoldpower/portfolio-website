class FinanceTraceStreamError extends Error {
    readonly session: string;

    constructor(session: string) {
        super(`Trace stream for session "${session}" was closed: the session is invalid or streaming is disabled`);
        this.name = "FinanceTraceStreamError";
        this.session = session;
    }
}

export { FinanceTraceStreamError };
