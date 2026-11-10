import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type HeroIndexRowProps = HTMLAttributes<HTMLDivElement> & {
    index: number;
};

function HeroIndexRow({
    index,
    className,
    children,
    ...props
}: HeroIndexRowProps) {
    return (
        <div
            className={cn(
                "grid min-h-9 grid-cols-[28px_minmax(0,1fr)] items-center border-t border-dashed border-extrude",
                className
            )}
            {...props}
        >
            <span className="opacity-70">{index}</span>
            <div className="flex min-w-0 items-center whitespace-nowrap">
                {children}
            </div>
        </div>
    );
}

export { HeroIndexRow };
export type { HeroIndexRowProps };
