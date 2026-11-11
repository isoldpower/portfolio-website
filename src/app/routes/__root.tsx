import { createRootRouteWithContext } from "@tanstack/react-router";
import { resolveLocale } from "@app/providers/i18n";
import { RootLayout } from "@app/root-layout.tsx";
import mainCss from "@app/style/globals.css?url";
import { loadTranslationOverrides } from "@features/localization/translation-overrides";
import { TRANSLATION_RESOURCES } from "@shared/lib/i18n";

import type { RouterContext } from "@app/router-context.ts";


const fontsCss = "https://fonts.googleapis.com/css2"
    + "?family=Onest:wght@400;500;600;700;800"
    + "&family=IBM+Plex+Mono:wght@400;600;700"
    + "&family=Noto+Sans+Mono:wdth,wght@62.5..100,100..900"
    + "&display=swap";


export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
    beforeLoad: () => ({
        locale: resolveLocale()
    }),
    loader: async ({ context }) => ({
        translationOverrides: await loadTranslationOverrides({ client: context.apiServers.translationApi })
    }),
    staleTime: Infinity,
    shouldReload: false,
    head: ({ match, loaderData }) => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { name: "theme-color", content: "#161a22" },
            { title: loaderData?.translationOverrides[match.context.locale]?.meta?.title
                    ?? TRANSLATION_RESOURCES[match.context.locale].translation.meta.title },
        ],
        links: [
            { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
            { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
            { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
            { rel: "manifest", href: "/site.webmanifest" },
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
            { rel: "stylesheet", href: fontsCss, crossOrigin: "anonymous" },
            { rel: "preload", href: mainCss, as: "style" },
            { rel: "stylesheet", href: mainCss },
        ]
    })
});
