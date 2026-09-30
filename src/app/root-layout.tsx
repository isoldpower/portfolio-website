import { HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { WebsiteProviders } from "./providers";
import { GlobalLayout } from "./global-layout.tsx";

import type { PropsWithChildren } from "react";


function RootDocument({ children }: Readonly<PropsWithChildren<object>>) {
    return (
        <html>
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
