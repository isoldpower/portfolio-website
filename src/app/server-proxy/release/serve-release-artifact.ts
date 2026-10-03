import { MISSING_RESOURCE_CACHE } from "@shared/lib/http";

import { contentTypeOf, isAllowedOwner, releaseAssetUrl } from "./release-artifact.ts";

import type { ReleaseArtifactParams } from "./release-artifact.ts";


const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";

function failureStatusOf(upstream: Response): number {
    return upstream.status === 404 ? 404 : 502;
}

function artifactNotFound(): Response {
    return new Response("Not found", {
        status: 404,
        headers: { "Cache-Control": MISSING_RESOURCE_CACHE },
    });
}

function artifactUnavailable(upstream: Response): Response {
    if (failureStatusOf(upstream) === 404) {
        return artifactNotFound();
    }

    return new Response("Artifact unavailable", { status: 502 });
}

function artifactHeaders(contentType: string, upstream: Response): Headers {
    const headers = new Headers({
        "Content-Type": contentType,
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Resource-Policy": "same-origin",
        "Cache-Control": IMMUTABLE_CACHE,
    });

    const contentLength = upstream.headers.get("Content-Length");
    if (contentLength !== null) {
        headers.set("Content-Length", contentLength);
    }

    return headers;
}

async function serveReleaseArtifact(params: ReleaseArtifactParams): Promise<Response> {
    const contentType = contentTypeOf(params.artifact);
    if (!isAllowedOwner(params.owner) || contentType === undefined) {
        return artifactNotFound();
    }

    const upstream = await fetch(releaseAssetUrl(params), { redirect: "follow" });
    if (!upstream.ok || upstream.body === null) {
        return artifactUnavailable(upstream);
    }

    return new Response(upstream.body, {
        status: 200,
        headers: artifactHeaders(contentType, upstream),
    });
}

export { serveReleaseArtifact };
