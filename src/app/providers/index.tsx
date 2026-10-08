import { QueryClientProvider } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";

import { ApiProvider } from "./api-provider.tsx";

import type { PropsWithChildren } from "react";


function WebsiteProviders({
    children
}: PropsWithChildren<object>) {
    const { apiServers, queryClient } = useRouteContext({ from: "__root__" });

    return (
        <QueryClientProvider client={queryClient}>
            <ApiProvider servers={apiServers}>
                {children}
            </ApiProvider>
        </QueryClientProvider>
    );
}

export { WebsiteProviders };
export { ApiProvider } from "./api-provider.tsx";
export { buildApiServers } from "./api-servers";
export { createQueryClient } from "./query-client.ts";

export type { ApiServers } from "./api-servers";
