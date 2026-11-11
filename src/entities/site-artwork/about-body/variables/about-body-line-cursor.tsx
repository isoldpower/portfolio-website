import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type AboutBodyLineCursorProps = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

const AboutBodyLineCursor: FC<AboutBodyLineCursorProps> = ({ className, ...props }) => {
    return (
        <span
            aria-hidden="true"
            className={cn("ml-1.5 inline-block h-4 w-[5px] bg-accent align-middle", className)}
            {...props}
        />
    );
};

AboutBodyLineCursor.displayName = "AboutBodyLineCursor";

export { AboutBodyLineCursor };
export type { AboutBodyLineCursorProps };
