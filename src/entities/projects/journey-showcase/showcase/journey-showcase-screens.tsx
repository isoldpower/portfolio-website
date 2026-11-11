import { cn } from "@shared/lib/utilities";
import { PIXEL_GRID_CLASS } from "../constants.ts";

import type { FC, ReactNode } from "react";


interface JourneyShowcaseScreensProps {
    aspectRatio: number;
    children: ReactNode;
}

const JourneyShowcaseScreens: FC<JourneyShowcaseScreensProps> = ({
    aspectRatio,
    children
}) => {
    return (
        <div
            className={cn(
                "relative w-[min(540px,36vw)] overflow-hidden",
                PIXEL_GRID_CLASS
            )}
            style={{ aspectRatio }}
        >
            {children}
        </div>
    );
};

JourneyShowcaseScreens.displayName = "JourneyShowcaseScreens";

export { JourneyShowcaseScreens };
export type { JourneyShowcaseScreensProps };
