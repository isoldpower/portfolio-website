import type {Integration} from "@features/integration/web-integration-registry";

interface IntegrationRegistry {
    RelatedIntegration: Integration;
}

export type { IntegrationRegistry };