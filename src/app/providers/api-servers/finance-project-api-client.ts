import { FinanceProjectApiClient } from "@features/integration/api";


function createFinanceProjectApiClient(envVariables: ImportMetaEnv): FinanceProjectApiClient {
    return new FinanceProjectApiClient({
        baseUrl: envVariables.CLIENT_FINANCE_API_BASE_URL,
        sandbox: envVariables.CLIENT_API_SANDBOX,
    });
}

export { createFinanceProjectApiClient };
