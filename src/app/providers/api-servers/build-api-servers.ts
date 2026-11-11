import { createFinanceProjectApiClient } from "./finance-project-api-client.ts";
import { createSanityApiClient } from "./sanity-api-client.ts";

import type { ApiServers } from "./types.ts";


function buildApiServers(envVariables: ImportMetaEnv): ApiServers {
    const sanityApi = createSanityApiClient(envVariables);

    return {
        projectApi: sanityApi,
        aboutApi: sanityApi,
        experienceApi: sanityApi,
        journeyApi: sanityApi,
        translationApi: sanityApi,
        financeProjectApi: createFinanceProjectApiClient(envVariables),
    };
}

export { buildApiServers };
