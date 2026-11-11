import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type HeroBodyArtworkColumnProps = HTMLAttributes<HTMLDivElement>;

const HeroBodyArtworkColumn: FC<HeroBodyArtworkColumnProps> = ({ className, ...props }) => {
    return (
        <div
            className={cn(
                "pointer-events-none absolute top-0 left-0 col-span-12 col-start-1 row-start-1 aspect-[4/5] w-full opacity-30",
                "max-md:translate-x-[24%] sm:max-md:translate-x-[40%] sm:max-md:-translate-y-[14%]",
                "md:col-span-7 md:col-start-6 md:w-[125%] md:max-w-none md:opacity-100 md:max-lg:-translate-y-[12%] lg:col-span-6 lg:col-start-7",
                className
            )}
            {...props}
        />
    );
};

HeroBodyArtworkColumn.displayName = "HeroBodyArtworkColumn";

export { HeroBodyArtworkColumn };
export type { HeroBodyArtworkColumnProps };
