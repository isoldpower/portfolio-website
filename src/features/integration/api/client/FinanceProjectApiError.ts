class FinanceProjectApiError extends Error {
    readonly path: string;
    readonly status: number;

    constructor(path: string, status: number) {
        super(`Finance project API request to "${path}" failed with status ${String(status)}`);
        this.name = "FinanceProjectApiError";
        this.path = path;
        this.status = status;
    }
}

export { FinanceProjectApiError };
