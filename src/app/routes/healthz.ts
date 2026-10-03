import { createFileRoute } from "@tanstack/react-router";


function reportHealthy(): Response {
    return new Response("ok", {
        status: 200,
        headers: { "Cache-Control": "no-store" },
    });
}

export const Route = createFileRoute("/healthz")({
    server: {
        handlers: {
            GET: reportHealthy,
        },
    },
});
