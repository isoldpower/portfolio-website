import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type SiteHeaderShellProps = HTMLAttributes<HTMLElement>;

function SiteHeaderShell({
    className,
    ...props
}: SiteHeaderShellProps) {
    return (
        <header
            className={cn(
                "flex items-center justify-between gap-4 border-b border-foreground/10 px-4 py-3",
                className
            )}
            {...props}
        />
    );
}

export { SiteHeaderShell };
export type { SiteHeaderShellProps };
