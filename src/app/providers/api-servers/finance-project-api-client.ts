import { FinanceProjectApiClient } from "@features/integration/api";
import { createAxiosInstance } from "@shared/api";


function createFinanceProjectApiClient(envVariables: ImportMetaEnv): FinanceProjectApiClient {
    const sandbox = envVariables.CLIENT_API_SANDBOX;
    const axiosInstance = createAxiosInstance({
        baseUrl: envVariables.CLIENT_FINANCE_API_BASE_URL,
        sandbox,
    });

    return new FinanceProjectApiClient(axiosInstance, { sandbox });
}

export { createFinanceProjectApiClient };
