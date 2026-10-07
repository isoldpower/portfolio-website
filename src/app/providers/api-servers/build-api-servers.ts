import { createSanityApiClient } from "./sanity-api-client.ts";

import type { ApiServers } from "./types.ts";


function buildApiServers(envVariables: ImportMetaEnv): ApiServers {
    return {
        projectApi: createSanityApiClient(envVariables),
    };
}

export { buildApiServers };
