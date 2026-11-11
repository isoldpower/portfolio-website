import { cn } from "@shared/lib/utilities";

import type { FC } from "react";


type JourneyStageShadeProps = Record<string, never>;

const JourneyStageShade: FC<JourneyStageShadeProps> = () => {
    return (
        <div
            data-journey="shade"
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0",
                "bg-[linear-gradient(#161a22_12%,#161a22ed_28%,#161a2240_65%,transparent_85%)] opacity-60"
            )}
        />
    );
};

JourneyStageShade.displayName = "JourneyStageShade";

export { JourneyStageShade };
export type { JourneyStageShadeProps };
