class DemoSessionStore {
    #browserSession: string | null = null;

    readonly subscribe = (): (() => void) => {
        return () => undefined;
    };

    readonly getSnapshot = (): string => {
        this.#browserSession ??= crypto.randomUUID();

        return this.#browserSession;
    };

    readonly getServerSnapshot = (): null => {
        return null;
    };
}

const demoSessionStore = new DemoSessionStore();

export { DemoSessionStore, demoSessionStore };
