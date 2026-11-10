import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type SiteHeaderShellProps = HTMLAttributes<HTMLElement>;

function SiteHeaderShell({
    className,
    children,
    ...props
}: SiteHeaderShellProps) {
    return (
        <header
            className={cn(
                "h-header bg-background lg:border-b lg:border-highlight",
                className
            )}
            {...props}
        >
            <div className="mx-auto box-content flex h-full max-w-7xl items-center justify-between gap-3 px-margin">
                {children}
            </div>
        </header>
    );
}

export { SiteHeaderShell };
export type { SiteHeaderShellProps };
