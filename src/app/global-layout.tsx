import type { PropsWithChildren } from "react";


function GlobalLayout({ children }: Readonly<PropsWithChildren<object>>) {
    return (
        <main>
            {children}
        </main>
    );
}


export { GlobalLayout };
