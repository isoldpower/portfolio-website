import { createClient } from "@sanity/client";

import type { ClientConfig, SanityClient } from "@sanity/client";


type SanityConfig = Required<Pick<ClientConfig, "projectId" | "dataset" | "apiVersion" | "useCdn">>;

function sanityConfigOf(envVariables: ImportMetaEnv): SanityConfig {
    return {
        projectId: envVariables.CLIENT_SANITY_PROJECT_ID,
        dataset: envVariables.CLIENT_SANITY_DATASET,
        apiVersion: envVariables.CLIENT_SANITY_API_VERSION,
        useCdn: envVariables.CLIENT_SANITY_USE_CDN === "true",
    };
}

function createSanityApiClient(envVariables: ImportMetaEnv): SanityClient {
    return createClient(sanityConfigOf(envVariables));
}

export { createSanityApiClient, sanityConfigOf };
export type { SanityConfig };
