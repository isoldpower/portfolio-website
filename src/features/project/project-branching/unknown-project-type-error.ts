class UnknownProjectTypeError extends Error {
    readonly kind: string;

    constructor(kind: string) {
        super(`No presentation is registered for project type "${kind}"`);
        this.name = "UnknownProjectTypeError";
        this.kind = kind;
    }
}

export { UnknownProjectTypeError };
