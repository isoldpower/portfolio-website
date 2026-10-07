import { useRouteContext } from "@tanstack/react-router";

import { ApiProvider } from "./api-provider.tsx";

import type { PropsWithChildren } from "react";


function WebsiteProviders({
    children
}: PropsWithChildren<object>) {
    const { apiServers } = useRouteContext({ from: "__root__" });

    return (
        <ApiProvider servers={apiServers}>
            {children}
        </ApiProvider>
    );
}

export { WebsiteProviders };
export { ApiProvider } from "./api-provider.tsx";
export { buildApiServers } from "./api-servers";

export type { ApiServers } from "./api-servers";
