import { createFileRoute } from "@tanstack/react-router";

import { serveRemoteImage } from "@app/server-proxy";


interface RemoteImageParams {
    host: string;
    _splat: string;
}

interface HandleGetRemoteImageParams {
    params: RemoteImageParams,
    request: Request
}

const handleGetRemoteImage = ({
    params,
    request
}: HandleGetRemoteImageParams) => {
    return serveRemoteImage(
        params.host,
        params._splat ?? "",
        request
    );
}

export const Route = createFileRoute("/(server-proxy)/remote-images/$host/$")({
    server: {
        handlers: {
            GET: handleGetRemoteImage
        },
    },
});
