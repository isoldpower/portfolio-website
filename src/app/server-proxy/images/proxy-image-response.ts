import { MISSING_RESOURCE_CACHE } from "@shared/lib/http";


const NOT_MODIFIED = 304;
const FORWARDED_REQUEST_HEADERS = [
    "Accept",
    "If-None-Match",
    "If-Modified-Since",
];
const FORWARDED_RESPONSE_HEADERS = [
    "Content-Type",
    "Cache-Control",
    "ETag",
    "Last-Modified",
    "Vary",
];

function copyHeaders(source: Headers, names: string[]): Headers {
    const headers = new Headers();
    for (const name of names) {
        const value = source.get(name);
        if (value !== null) {
            headers.set(name, value);
        }
    }

    return headers;
}

function isImage(upstream: Response): boolean {
    const startWithImage = upstream.headers
        .get("Content-Type")
        ?.startsWith("image/");

    return startWithImage === true
}

function failureStatusOf(upstream: Response): number {
    return upstream.status === 404
        ? 404
        : 502;
}

function rejectImageRequest(status: number, message: string): Response {
    return new Response(message, {
        status,
        headers: { "Cache-Control": MISSING_RESOURCE_CACHE }
    });
}

function imageUnavailable(upstream: Response): Response {
    const status = failureStatusOf(upstream);
    if (status === 404) {
        return rejectImageRequest(status, "Image not found");
    }

    return new Response("Image unavailable", { status });
}

async function proxyImageResponse(upstreamUrl: string, request: Request): Promise<Response> {
    const upstream = await fetch(upstreamUrl, {
        headers: copyHeaders(request.headers, FORWARDED_REQUEST_HEADERS),
        redirect: "follow",
    });

    const headers = copyHeaders(upstream.headers, FORWARDED_RESPONSE_HEADERS);
    headers.set("Cross-Origin-Resource-Policy", "same-origin");

    if (upstream.status === NOT_MODIFIED) {
        return new Response(null, {
            status: NOT_MODIFIED,
            headers
        });
    } else if (!upstream.ok || upstream.body === null || !isImage(upstream)) {
        return imageUnavailable(upstream);
    }

    return new Response(upstream.body, {
        status: 200,
        headers
    });
}

export { proxyImageResponse, rejectImageRequest };
