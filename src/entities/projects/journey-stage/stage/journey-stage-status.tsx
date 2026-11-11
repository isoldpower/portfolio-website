import type { FC, ReactNode } from "react";


interface JourneyStageStatusProps {
    children: ReactNode;
}

const JourneyStageStatus: FC<JourneyStageStatusProps> = ({ children }) => {
    return (
        <span aria-live="polite">
            {children}
        </span>
    );
};

JourneyStageStatus.displayName = "JourneyStageStatus";

export { JourneyStageStatus };
export type { JourneyStageStatusProps };
