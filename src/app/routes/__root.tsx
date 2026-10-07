import { createRootRouteWithContext } from "@tanstack/react-router";

import mainCss from "@app/style/globals.css?url";

import { RootLayout } from "../root-layout.tsx";

import type { RouterContext } from "../router-context.ts";


const fontsCss = "https://fonts.googleapis.com/css2"
    + "?family=Hanken+Grotesk:wght@400;500;600;700"
    + "&family=Space+Grotesk:wght@500;600;700"
    + "&family=JetBrains+Mono:wght@400;500"
    + "&display=swap";


export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { title: "Portfolio" },
        ],
        links: [
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
            { rel: "stylesheet", href: fontsCss, crossOrigin: "anonymous" },
            { rel: "preload", href: mainCss, as: "style" },
            { rel: "stylesheet", href: mainCss },
        ]
    })
});
