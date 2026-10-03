import { createFileRoute } from "@tanstack/react-router";

import { serveSanityImage } from "@app/server-proxy";


interface ImageParams {
    host: string;
    _splat: string;
}

interface HandleGetImageParams {
    params: ImageParams,
    request: Request
}

const handleGetImage = ({
    params,
    request
}: HandleGetImageParams) => {
    return serveSanityImage(params._splat ?? "", request);
}

export const Route = createFileRoute("/(server-proxy)/images/$")({
    server: {
        handlers: {
            GET: handleGetImage
        },
    },
});
