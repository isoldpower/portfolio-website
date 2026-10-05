import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type ProjectNavigationProps = HTMLAttributes<HTMLSpanElement>;

function ProjectNavigation({
    className,
    ...props
}: ProjectNavigationProps) {
    return (
        <span
            className={cn(
                "block rounded-lg border border-foreground/10 p-5 transition-colors",
                "hover:border-foreground/25",
                "in-focus-visible:outline-2 in-focus-visible:outline-accent",
                className
            )}
            {...props}
        />
    );
}

export { ProjectNavigation };
export type { ProjectNavigationProps };
