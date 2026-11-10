import type {Integration} from "@features/integrations/web-integration-registry";

interface IntegrationRegistry {
    RelatedIntegration: Integration;
}

export type { IntegrationRegistry };