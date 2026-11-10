import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type HeroSectionShellProps = HTMLAttributes<HTMLElement>;

function HeroSectionShell({
    className,
    ...props
}: HeroSectionShellProps) {
    return (
        <section
            className={cn("grid grid-cols-12 gap-x-gutter", className)}
            {...props}
        />
    );
}

export { HeroSectionShell };
export type { HeroSectionShellProps };
