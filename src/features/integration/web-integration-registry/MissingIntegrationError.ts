class MissingIntegrationError extends Error {
    readonly slug: string;

    constructor(slug: string) {
        super(`No integration is registered for project "${slug}"`);
        this.name = "MissingIntegrationError";
        this.slug = slug;
    }
}

export { MissingIntegrationError };
