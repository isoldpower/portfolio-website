import { useRef } from "react";

import { IntegrationRegistry } from "./IntegrationRegistry.ts";

import type { IntegrationEntries } from "./IntegrationRegistry.ts";


function buildIntegrationRegistry(entries: IntegrationEntries = {}): IntegrationRegistry {
    const registry = new IntegrationRegistry();

    for (const [slug, integration] of Object.entries(entries)) {
        registry.register(slug, integration);
    }

    return registry;
}

function useIntegrationRegistry(entries: IntegrationEntries): IntegrationRegistry {
    const integrations = useRef(buildIntegrationRegistry(entries));

    return integrations.current;
}

export { buildIntegrationRegistry, useIntegrationRegistry };
