import { createContext, use } from "react";

import type { IntegrationRegistry } from "./types.ts";


const IntegrationRegistryContext = createContext<IntegrationRegistry | null>(null);

const useIntegrationRegistryContext = () => {
    const context = use(IntegrationRegistryContext);

    if (!context) {
        throw new Error('Unable to use integration registry context. Out of bounds');
    }

    return context;
}

export { IntegrationRegistryContext, useIntegrationRegistryContext };