import { use } from "react";

import { ProjectApiContext } from "./project-api-context.ts";

import type { ProjectApiClient } from "../types.ts";


function useProjectApiClient(): ProjectApiClient {
    const client = use(ProjectApiContext);

    if (client === null) {
        throw new Error("useProjectApiClient must be used within an ApiProvider");
    }

    return client;
}

export { useProjectApiClient };
