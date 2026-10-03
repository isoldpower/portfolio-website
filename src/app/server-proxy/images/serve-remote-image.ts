import { isRemoteImageHost } from "@shared/lib/utilities";
import { proxyImageResponse, rejectImageRequest } from "./proxy-image-response.ts";


function serveRemoteImage(
    host: string,
    path: string,
    request: Request
): Promise<Response> | Response {
    if (!isRemoteImageHost(host) || path.includes("..")) {
        return rejectImageRequest(404, "Not found");
    }
    if (new URL(request.url).search !== "") {
        return rejectImageRequest(400, "Remote images take no parameters");
    }

    return proxyImageResponse(`https://${host}/${path}`, request);
}

export { serveRemoteImage };
