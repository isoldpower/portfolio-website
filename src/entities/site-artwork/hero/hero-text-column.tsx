import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type HeroTextColumnProps = HTMLAttributes<HTMLDivElement>;

function HeroTextColumn({
    className,
    ...props
}: HeroTextColumnProps) {
    return (
        <div
            className={cn(
                "relative z-10 col-span-12 col-start-1 row-start-1 flex flex-col items-start pt-8",
                "md:col-span-5",
                className
            )}
            {...props}
        />
    );
}

export { HeroTextColumn };
export type { HeroTextColumnProps };
