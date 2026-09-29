import { HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { WebsiteProviders } from "@app/providers";

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
                <Outlet />
            </WebsiteProviders>
            {import.meta.env.DEV ? (
                <TanStackRouterDevtools initialIsOpen={false} position="bottom-left" />
            ) : null}
        </RootDocument>
    );
}

export { RootLayout };
