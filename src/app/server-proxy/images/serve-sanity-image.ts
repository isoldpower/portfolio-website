import { SANITY_IMAGE_ORIGIN, areImageParametersAllowed } from "@shared/lib/utilities";

import { proxyImageResponse, rejectImageRequest } from "./proxy-image-response.ts";


const datasetPrefix = `${import.meta.env.CLIENT_SANITY_PROJECT_ID}/${import.meta.env.CLIENT_SANITY_DATASET}/`;

function serveSanityImage(path: string, request: Request): Promise<Response> | Response {
    if (!path.startsWith(datasetPrefix) || path.includes("..")) {
        return rejectImageRequest(404, "Not found");
    }

    const { search, searchParams } = new URL(request.url);
    if (!areImageParametersAllowed(searchParams)) {
        return rejectImageRequest(400, "Unsupported image parameters");
    }

    return proxyImageResponse(
        `${SANITY_IMAGE_ORIGIN}/images/${path}${search}`,
        request
    );
}

export { serveSanityImage };
