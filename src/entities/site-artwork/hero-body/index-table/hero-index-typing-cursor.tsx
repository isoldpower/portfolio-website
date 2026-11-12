import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type HeroIndexTypingCursorProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

const HeroIndexTypingCursor: FC<HeroIndexTypingCursorProps> = ({ className, ...props }) => {
    return (
        <span
            aria-hidden="true"
            className={cn("mx-px inline-block h-[1.15em] w-[0.6em] bg-highlight", className)}
            {...props}
        />
    );
};

HeroIndexTypingCursor.displayName = "HeroIndexTypingCursor";

export { HeroIndexTypingCursor };
export type { HeroIndexTypingCursorProps };
