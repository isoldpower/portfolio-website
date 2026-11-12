import { QueryClientProvider } from "@tanstack/react-query";
import { useLoaderData, useRouteContext } from "@tanstack/react-router";
import { useMemo } from "react";

import { mergeTranslationResources } from "@shared/lib/i18n";

import { ApiProvider } from "./api-provider.tsx";
import { InternationalizationProvider } from "./i18n";

import type { PropsWithChildren } from "react";


function WebsiteProviders({
    children
}: PropsWithChildren<object>) {
    const { apiServers, queryClient, locale } = useRouteContext({ from: "__root__" });
    const { translationOverrides } = useLoaderData({ from: "__root__" });
    const resources = useMemo(() => {
        return mergeTranslationResources(translationOverrides);
    }, [translationOverrides]);

    return (
        <InternationalizationProvider locale={locale} resources={resources}>
            <QueryClientProvider client={queryClient}>
                <ApiProvider servers={apiServers}>
                    {children}
                </ApiProvider>
            </QueryClientProvider>
        </InternationalizationProvider>
    );
}

export { WebsiteProviders };
export { ApiProvider } from "./api-provider.tsx";
export { buildApiServers } from "./api-servers";
export { createQueryClient } from "./query-client.ts";

export type { ApiServers } from "./api-servers";
