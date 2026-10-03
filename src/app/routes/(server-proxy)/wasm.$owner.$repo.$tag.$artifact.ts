import { createFileRoute } from "@tanstack/react-router";
import { serveReleaseArtifact } from "@app/server-proxy";

import type { ReleaseArtifactParams } from "@app/server-proxy";


interface HandleGetArtifactParams {
    params: ReleaseArtifactParams
}

const handleGetArtifact = ({
    params
}: HandleGetArtifactParams) => {
    return serveReleaseArtifact(params);
}

export const Route = createFileRoute("/(server-proxy)/wasm/$owner/$repo/$tag/$artifact")({
    server: {
        handlers: {
            GET: handleGetArtifact
        },
    },
});