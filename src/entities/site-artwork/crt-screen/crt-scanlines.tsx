import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type CrtScanlinesProps = HTMLAttributes<HTMLDivElement>;

function CrtScanlines({
    className,
    ...props
}: CrtScanlinesProps) {
    return (
        <div
            className={cn(
                "absolute inset-0",
                "bg-[repeating-linear-gradient(to_bottom,transparent_0_2px,rgb(2_4_10/0.084)_2px_3px)]",
                className
            )}
            {...props}
        />
    );
}

export { CrtScanlines };
export type { CrtScanlinesProps };
