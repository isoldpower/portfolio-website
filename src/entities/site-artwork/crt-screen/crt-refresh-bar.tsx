import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type CrtRefreshBarProps = HTMLAttributes<HTMLDivElement>;

function CrtRefreshBar({
    className,
    ...props
}: CrtRefreshBarProps) {
    return (
        <div
            className={cn(
                "absolute inset-x-0 top-0 h-[22vh]",
                "bg-linear-to-b from-highlight/0 via-highlight/[0.035] via-60% to-highlight/0",
                className
            )}
            {...props}
        />
    );
}

export { CrtRefreshBar };
export type { CrtRefreshBarProps };
