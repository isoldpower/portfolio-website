import { FinanceProjectApiClient } from "@features/integration/api";


function createFinanceProjectApiClient(envVariables: ImportMetaEnv): FinanceProjectApiClient {
    return new FinanceProjectApiClient(envVariables.CLIENT_FINANCE_API_BASE_URL);
}

export { createFinanceProjectApiClient };
