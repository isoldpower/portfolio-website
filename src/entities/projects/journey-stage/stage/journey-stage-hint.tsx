import type { FC, ReactNode } from "react";


interface JourneyStageHintProps {
    children: ReactNode;
}

const JourneyStageHint: FC<JourneyStageHintProps> = ({ children }) => {
    return (
        <span className="text-foreground [text-shadow:0_0_8px_rgba(22,26,34,0.9)] max-sm:hidden">
            {children}
        </span>
    );
};

JourneyStageHint.displayName = "JourneyStageHint";

export { JourneyStageHint };
export type { JourneyStageHintProps };
