import { createFinanceProjectApiClient } from "./finance-project-api-client.ts";
import { createSanityApiClient } from "./sanity-api-client.ts";

import type { ApiServers } from "./types.ts";


function buildApiServers(envVariables: ImportMetaEnv): ApiServers {
    return {
        projectApi: createSanityApiClient(envVariables),
        financeProjectApi: createFinanceProjectApiClient(envVariables),
    };
}

export { buildApiServers };
