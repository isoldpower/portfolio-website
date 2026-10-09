import { FinanceInfraVisualization } from "@processes/integration/finance-integration";

import type { IntegrationEntries } from "@features/integration/web-integration-registry";


const WEB_INTEGRATIONS: IntegrationEntries = {
    "power-finance": FinanceInfraVisualization,
};

export { WEB_INTEGRATIONS };