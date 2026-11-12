import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface JourneySceneWorldProps {
    className?: string;
    children: ReactNode;
}

const JourneySceneWorld: FC<JourneySceneWorldProps> = ({ className, children }) => {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute left-[22%] [translate:round(calc(var(--journey-cam)*-1px),2px)_0]",
                className
            )}
        >
            {children}
        </div>
    );
};

JourneySceneWorld.displayName = "JourneySceneWorld";

export { JourneySceneWorld };
export type { JourneySceneWorldProps };
