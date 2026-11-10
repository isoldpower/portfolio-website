import { CrtOverlay } from "@processes/site-artwork/crt-overlay";
import { SiteHeader } from "@processes/site-artwork/site-header";
import { DefaultGutter } from "@shared/lib/components";

import type { PropsWithChildren } from "react";


function GlobalLayout({ children }: Readonly<PropsWithChildren<object>>) {
    return (
        <>
            <div className="sticky top-0 layer-header">
                <SiteHeader />
            </div>
            <DefaultGutter element="main" className="relative layer-content">
                {children}
            </DefaultGutter>
            <div className="pointer-events-none fixed inset-0 layer-effects">
                <CrtOverlay />
            </div>
        </>
    );
}


export { GlobalLayout };
