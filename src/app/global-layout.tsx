import { SiteHeader } from "@widgets/site/site-header";

import type { PropsWithChildren } from "react";


function GlobalLayout({ children }: Readonly<PropsWithChildren<object>>) {
    return (
        <>
            <SiteHeader />
            <main>
                {children}
            </main>
        </>
    );
}


export { GlobalLayout };
