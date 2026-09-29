import { createRootRoute } from "@tanstack/react-router";

import mainCss from "@app/style/globals.css?url";

import { RootLayout } from "../root-layout.tsx";


export const Route = createRootRoute({
    component: RootLayout,
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { title: "Portfolio" },
        ],
        links: [
            { rel: "preload", href: mainCss, as: "style" },
            { rel: "stylesheet", href: mainCss },
        ]
    })
});
