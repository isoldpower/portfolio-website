import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type SiteHeaderGroupProps = HTMLAttributes<HTMLDivElement>;

function SiteHeaderGroup({
    className,
    children,
    ...props
}: SiteHeaderGroupProps) {
    return (
        <div className={cn("flex shrink-0 items-center gap-3 lg:gap-4", className)} {...props}>
            {children}
        </div>
    );
}

export { SiteHeaderGroup };
export type { SiteHeaderGroupProps };
