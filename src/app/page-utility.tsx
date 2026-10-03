import { getRouteApi } from "@tanstack/react-router";

import type {
    ClientLayoutPageProps,
    PageLoaderData,
    PageRouteId
} from "@shared/lib/types";
import type { ComponentType, FC } from "react";


function createPageElement<TRouteId extends PageRouteId>(
    routeId: TRouteId,
    Page: ComponentType<ClientLayoutPageProps<PageLoaderData<TRouteId>, TRouteId>>
): FC {
    const routeApi = getRouteApi(routeId);

    function PageElement() {
        const data = routeApi.useLoaderData();
        const params = routeApi.useParams();
        const search = routeApi.useSearch();
        const loaderDeps = routeApi.useLoaderDeps();
        const context = routeApi.useRouteContext();

        const pageProps = {
            ...data,
            additionalProps: { params, search, loaderDeps, context },
        } as ClientLayoutPageProps<PageLoaderData<TRouteId>, TRouteId>;

        return <Page {...pageProps} />;
    }

    PageElement.displayName = `PageElement(${routeId})`;

    return PageElement;
}

export { createPageElement };
