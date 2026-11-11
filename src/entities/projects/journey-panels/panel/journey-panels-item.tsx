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
                "absolute inset-0 grid content-start gap-4 opacity-0",
                "lg:grid-cols-[minmax(0,1fr)_auto] lg:content-center lg:items-center lg:gap-10",
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
