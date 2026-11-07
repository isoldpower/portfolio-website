import { HeadContent, Outlet, Scripts, useRouteContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { GlobalLayout } from "./global-layout.tsx";
import { WebsiteProviders } from "./providers";

import type { PropsWithChildren } from "react";


function RootDocument({ children }: Readonly<PropsWithChildren<object>>) {
    const { locale } = useRouteContext({ from: "__root__" });

    return (
        <html lang={locale}>
        <head>
            <HeadContent />
        </head>
        <body>
            {children}
            <Scripts />
        </body>
        </html>
    );
}

function RootLayout() {
    return (
        <RootDocument>
            <WebsiteProviders>
                <GlobalLayout>
                    <Outlet />
                </GlobalLayout>
            </WebsiteProviders>
            {import.meta.env.DEV ? (
                <TanStackRouterDevtools initialIsOpen={false} position="bottom-left" />
            ) : null}
        </RootDocument>
    );
}

export { RootLayout };
