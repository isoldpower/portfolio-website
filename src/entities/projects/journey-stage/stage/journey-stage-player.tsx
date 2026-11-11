import type { FC, ReactNode } from "react";


interface JourneyStagePlayerProps {
    children: ReactNode;
}

const JourneyStagePlayer: FC<JourneyStagePlayerProps> = ({ children }) => {
    return (
        <span>
            {children}
        </span>
    );
};

JourneyStagePlayer.displayName = "JourneyStagePlayer";

export { JourneyStagePlayer };
export type { JourneyStagePlayerProps };
