import { use } from "react";

import { FinanceProjectApiContext } from "./finance-project-api-context.ts";

import type { FinanceProjectApiClient } from "../client/FinanceProjectApiClient.ts";


function useFinanceProjectApiClient(): FinanceProjectApiClient {
    const client = use(FinanceProjectApiContext);

    if (client === null) {
        throw new Error("useFinanceProjectApiClient must be used within an ApiProvider");
    }

    return client;
}

export { useFinanceProjectApiClient };
