import { PlainText } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyStagePlayerProps {
    children: ReactNode;
}

const JourneyStagePlayer: FC<JourneyStagePlayerProps> = ({ children }) => {
    return (
        <PlainText>
            {children}
        </PlainText>
    );
};

JourneyStagePlayer.displayName = "JourneyStagePlayer";

export { JourneyStagePlayer };
export type { JourneyStagePlayerProps };
