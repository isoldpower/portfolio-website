import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type HeroBodyTextColumnProps = HTMLAttributes<HTMLDivElement>;

const HeroBodyTextColumn: FC<HeroBodyTextColumnProps> = ({ className, ...props }) => {
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
};

HeroBodyTextColumn.displayName = "HeroBodyTextColumn";

export { HeroBodyTextColumn };
export type { HeroBodyTextColumnProps };
