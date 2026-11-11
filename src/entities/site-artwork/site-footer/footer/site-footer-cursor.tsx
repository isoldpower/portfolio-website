import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type SiteFooterCursorProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

const SiteFooterCursor: FC<SiteFooterCursorProps> = ({ className, ...props }) => {
    return (
        <span
            aria-hidden="true"
            className={cn("ml-1 inline-block h-4 w-2 bg-accent", className)}
            {...props}
        />
    );
};

SiteFooterCursor.displayName = "SiteFooterCursor";

export { SiteFooterCursor };
export type { SiteFooterCursorProps };
