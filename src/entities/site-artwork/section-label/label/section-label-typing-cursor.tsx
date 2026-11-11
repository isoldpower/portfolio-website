import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type SectionLabelTypingCursorProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

const SectionLabelTypingCursor: FC<SectionLabelTypingCursorProps> = ({ className, ...props }) => {
    return (
        <span
            aria-hidden="true"
            className={cn("-mr-2.5 ml-0.5 inline-block h-4 w-2 bg-accent", className)}
            {...props}
        />
    );
};

SectionLabelTypingCursor.displayName = "SectionLabelTypingCursor";

export { SectionLabelTypingCursor };
export type { SectionLabelTypingCursorProps };
