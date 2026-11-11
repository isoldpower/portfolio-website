import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface JourneyPanelsItemProps {
    index: number;
    restOffset: number;
    isLive: boolean;
    children: ReactNode;
}

const JourneyPanelsItem: FC<JourneyPanelsItemProps> = ({
    index,
    restOffset,
    isLive,
    children
}) => {
    return (
        <article
            data-journey-panel={index}
            aria-hidden={!isLive}
            inert={!isLive}
            className={cn(
                "absolute inset-0 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto]",
                !isLive && "pointer-events-none"
            )}
            style={{ transform: `translate3d(${String(restOffset)}px, 0, 0)` }}
        >
            {children}
        </article>
    );
};

JourneyPanelsItem.displayName = "JourneyPanelsItem";

export { JourneyPanelsItem };
export type { JourneyPanelsItemProps };
