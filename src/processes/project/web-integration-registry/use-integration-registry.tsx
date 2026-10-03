import { useRef } from "react";
import { FinanceInfraVisualization } from "@widgets/project/finance-infra-visualization";
import { IntegrationRegistry } from "./IntegrationRegistry.ts";

import type { IntegrationEntries } from "./IntegrationRegistry.ts";


function buildIntegrationRegistry(entries: IntegrationEntries = {}): IntegrationRegistry {
    const registry = new IntegrationRegistry();

    for (const [slug, integration] of Object.entries(entries)) {
        registry.register(slug, integration);
    }

    return registry;
}

function useIntegrationRegistry() {
    const integrations = useRef(buildIntegrationRegistry({
        "power-finance": FinanceInfraVisualization
    }));

    return integrations.current;
}

export { useIntegrationRegistry };