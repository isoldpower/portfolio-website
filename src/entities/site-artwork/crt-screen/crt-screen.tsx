import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type CrtScreenProps = HTMLAttributes<HTMLDivElement>;

function CrtScreen({
    className,
    ...props
}: CrtScreenProps) {
    return (
        <div
            aria-hidden="true"
            className={cn("pointer-events-none fixed inset-0 overflow-hidden", className)}
            {...props}
        />
    );
}

export { CrtScreen };
export type { CrtScreenProps };
