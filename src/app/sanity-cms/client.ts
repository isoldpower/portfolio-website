import { createClient } from "@sanity/client";

import type { ClientConfig } from "@sanity/client";


const parsedEnvVariables = {
    projectId: import.meta.env.CLIENT_SANITY_PROJECT_ID,
    dataset: import.meta.env.CLIENT_SANITY_DATASET,
    apiVersion: import.meta.env.CLIENT_SANITY_API_VERSION,
    useCdn: import.meta.env.CLIENT_SANITY_USE_CDN === "true",
} satisfies ClientConfig;

export const sanityClient = createClient(parsedEnvVariables);