import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type HeroIndexTableProps = HTMLAttributes<HTMLDivElement>;

function HeroIndexTable({
    className,
    ...props
}: HeroIndexTableProps) {
    return (
        <div
            className={cn(
                "mt-24 w-full max-w-[470px] border-b border-dashed border-extrude font-mono text-md text-foreground",
                "md:mt-40 lg:mt-48",
                className
            )}
            {...props}
        />
    );
}

export { HeroIndexTable };
export type { HeroIndexTableProps };
