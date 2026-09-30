import type { PropsWithChildren } from "react";


function GlobalLayout({ children }: Readonly<PropsWithChildren<object>>) {
    return (
        <main className="px-4 py-8">
            {children}
        </main>
    );
}


export { GlobalLayout };
