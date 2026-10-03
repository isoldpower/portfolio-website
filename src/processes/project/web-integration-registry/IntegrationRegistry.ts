import { MissingIntegrationError } from "./MissingIntegrationError.ts";

import type { FC, ReactNode } from "react";


type Integration = FC<{ children: ReactNode }>;

type IntegrationEntries = Record<string, Integration>;

class IntegrationRegistry {
    readonly #integrations = new Map<string, Integration>();

    register(slug: string, integration: Integration): this {
        this.#integrations.set(slug, integration);

        return this;
    }

    has(slug: string): boolean {
        return this.#integrations.has(slug);
    }

    resolve(slug: string): Integration {
        const integration = this.#integrations.get(slug);

        if (integration === undefined) {
            throw new MissingIntegrationError(slug);
        }

        return integration;
    }
}

export { IntegrationRegistry };
export type {
    Integration,
    IntegrationEntries,
    IntegrationRegistry as IntegrationRegistryInstance,
};
