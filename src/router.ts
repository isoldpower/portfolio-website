import { createRouter } from "@tanstack/react-router";

import { buildApiServers } from "@app/providers/api-servers";
import { routeTree } from "@app/routes/routeTree.gen.ts";
import { DefaultNotFoundBoundary, DefaultCatchBoundary } from "@shared/ui-toolkit/default-fx";

const apiServers = buildApiServers(import.meta.env);

export function getRouter() {
    return createRouter({
        routeTree,
        context: { apiServers },
        scrollRestoration: true,
        defaultPreload: "intent",
        defaultErrorComponent: DefaultCatchBoundary,
        defaultNotFoundComponent: DefaultNotFoundBoundary
    });
}
