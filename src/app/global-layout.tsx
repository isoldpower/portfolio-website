import { useRouterState } from "@tanstack/react-router";

import { IntroReveal, IntroStageProvider } from "@features/site-artwork/intro-loader";
import { CrtOverlay } from "@processes/site-artwork/crt-overlay";
import { SiteFooter } from "@processes/site-artwork/site-footer";
import { SiteHeader } from "@processes/site-artwork/site-header";
import { AnimationComposer, DefaultGutter } from "@shared/lib/components";
import { IntroLoader } from "@widgets/site-artwork/intro-loader";

import type { PropsWithChildren } from "react";


function GlobalLayout({ children }: Readonly<PropsWithChildren<object>>) {
    const isHome = useRouterState({
        select: (state) => state.location.pathname === "/"
    });

    return (
        <IntroStageProvider isEnabled={isHome}>
            <AnimationComposer>
                <IntroReveal order={0} />
                <div className="sticky top-0 layer-header">
                    <SiteHeader />
                </div>
            </AnimationComposer>
            <DefaultGutter element="main" className="relative layer-content">
                {children}
            </DefaultGutter>
            <AnimationComposer>
                <IntroReveal order={0} />
                <div className="sticky top-0 layer-header">
                    <SiteFooter />
                </div>
            </AnimationComposer>
            <div className="pointer-events-none fixed inset-0 layer-loader">
                <IntroLoader />
            </div>
            <div className="pointer-events-none fixed inset-0 layer-effects">
                <CrtOverlay />
            </div>
        </IntroStageProvider>
    );
}


export { GlobalLayout };
