import { FinanceInfraVisualization } from "@processes/integrations/finance-integration";

import type { IntegrationEntries } from "@features/integrations/web-integration-registry";


const WEB_INTEGRATIONS: IntegrationEntries = {
    "power-finance": FinanceInfraVisualization,
};

export { WEB_INTEGRATIONS };