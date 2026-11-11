import { cn } from "@shared/lib/utilities";

import { PIXEL_GRID_CLASS } from "../constants.ts";

import type { FC, ReactNode } from "react";


interface JourneyShowcasePlaceholderProps {
    children: ReactNode;
}

const JourneyShowcasePlaceholder: FC<JourneyShowcasePlaceholderProps> = ({ children }) => {
    return (
        <div
            className={cn(
                "flex aspect-2/1 w-[min(540px,36vw)] flex-col items-center justify-center gap-5 text-center",
                PIXEL_GRID_CLASS
            )}
        >
            {children}
        </div>
    );
};

JourneyShowcasePlaceholder.displayName = "JourneyShowcasePlaceholder";

export { JourneyShowcasePlaceholder };
export type { JourneyShowcasePlaceholderProps };
