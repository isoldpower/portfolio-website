import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type IntroNameLineTypingCursorProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

const IntroNameLineTypingCursor: FC<IntroNameLineTypingCursorProps> = ({ className, ...props }) => {
    return (
        <span
            aria-hidden="true"
            className={cn("mx-[0.04em] inline-block h-[0.62em] w-[0.07em] bg-highlight text-[min(7.375rem,9vw)] max-xs:text-[7vw]", className)}
            {...props}
        />
    );
};

IntroNameLineTypingCursor.displayName = "IntroNameLineTypingCursor";

export { IntroNameLineTypingCursor };
export type { IntroNameLineTypingCursorProps };
