import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type AsciiRabbitFrameProps = HTMLAttributes<HTMLDivElement>;

function AsciiRabbitFrame({
    className,
    ...props
}: AsciiRabbitFrameProps) {
    return (
        <div
            role="img"
            className={cn("relative size-full", className)}
            {...props}
        />
    );
}

export { AsciiRabbitFrame };
export type { AsciiRabbitFrameProps };
