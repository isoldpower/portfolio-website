import { DEMO_SESSION_ID_PATTERN, DEMO_SESSION_STORAGE_KEY, DEMO_SESSION_TTL_MS } from "./config.ts";


interface StoredDemoSession {
    id: string;
    expires_at: number;
}

class DemoSessionStore {
    #session: string | null = null;

    readonly subscribe = (): (() => void) => {
        return () => undefined;
    };

    readonly getSnapshot = (): string => {
        this.#session ??= this.#restore() ?? this.#issue();

        return this.#session;
    };

    readonly getServerSnapshot = (): null => {
        return null;
    };

    #restore(): string | null {
        try {
            const stored = this.#parse(localStorage.getItem(DEMO_SESSION_STORAGE_KEY));

            return stored !== null && stored.expires_at > Date.now() ? stored.id : null;
        } catch {
            return null;
        }
    }

    #issue(): string {
        const stored: StoredDemoSession = {
            id: crypto.randomUUID(),
            expires_at: Date.now() + DEMO_SESSION_TTL_MS,
        };

        this.#persist(stored);

        return stored.id;
    }

    #persist(stored: StoredDemoSession): boolean {
        try {
            localStorage.setItem(
                DEMO_SESSION_STORAGE_KEY,
                JSON.stringify(stored)
            );

            return true;
        } catch {
            return false;
        }
    }

    #parse(rawValue: string | null): StoredDemoSession | null {
        if (rawValue === null) {
            return null;
        }

        const candidate: unknown = JSON.parse(rawValue);

        if (typeof candidate !== "object" || candidate === null) {
            return null;
        }

        const { id, expires_at: expiresAt } = candidate as Partial<Record<keyof StoredDemoSession, unknown>>;

        if (
            typeof id !== "string" ||
            !DEMO_SESSION_ID_PATTERN.test(id) ||
            typeof expiresAt !== "number"
        ) {
            return null;
        }

        return { id, expires_at: expiresAt };
    }
}

const demoSessionStore = new DemoSessionStore();

export { DemoSessionStore, demoSessionStore };
export type { StoredDemoSession };
