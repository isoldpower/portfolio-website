import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type HeroArtworkColumnProps = HTMLAttributes<HTMLDivElement>;

function HeroArtworkColumn({
    className,
    ...props
}: HeroArtworkColumnProps) {
    return (
        <div
            className={cn(
                "pointer-events-none relative col-span-12 col-start-1 row-start-1 aspect-[4/5] opacity-30 max-md:translate-x-[24%] sm:max-md:translate-x-[40%] sm:max-md:-translate-y-[14%]",
                "md:col-span-7 md:col-start-6 md:w-[125%] md:max-w-none md:opacity-100 md:max-lg:-translate-y-[12%] lg:col-span-6 lg:col-start-7",
                className
            )}
            {...props}
        />
    );
}

export { HeroArtworkColumn };
export type { HeroArtworkColumnProps };
