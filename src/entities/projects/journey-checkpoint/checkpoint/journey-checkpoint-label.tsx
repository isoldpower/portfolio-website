import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface JourneyCheckpointLabelProps {
    isPending: boolean;
    children: ReactNode;
}

const JourneyCheckpointLabel: FC<JourneyCheckpointLabelProps> = ({ isPending, children }) => {
    return (
        <span
            data-label
            className={cn(
                "absolute inset-x-0 bottom-0.5 text-center text-2xs tracking-[1px] whitespace-nowrap",
                isPending && "opacity-60"
            )}
        >
            <span data-caret className="opacity-0">&gt; </span>
            {children}
        </span>
    );
};

JourneyCheckpointLabel.displayName = "JourneyCheckpointLabel";

export { JourneyCheckpointLabel };
export type { JourneyCheckpointLabelProps };
