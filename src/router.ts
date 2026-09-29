import { createRouter } from "@tanstack/react-router";

import { DefaultNotFoundBoundary, DefaultCatchBoundary } from "@app/default-fx";
import { routeTree } from "@app/routes/routeTree.gen.ts";

export function getRouter() {
    return createRouter({
        routeTree,
        scrollRestoration: true,
        defaultPreload: "intent",
        defaultErrorComponent: DefaultCatchBoundary,
        defaultNotFoundComponent: DefaultNotFoundBoundary
    });
}
