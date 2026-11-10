import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type HeroTypingCursorProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

function HeroTypingCursor({
    className,
    ...props
}: HeroTypingCursorProps) {
    return (
        <span
            aria-hidden="true"
            className={cn("mx-px inline-block h-[1.15em] w-[0.6em] bg-highlight", className)}
            {...props}
        />
    );
}

export { HeroTypingCursor };
export type { HeroTypingCursorProps };
