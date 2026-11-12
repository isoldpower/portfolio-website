import { PlainText } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyStageStatusProps {
    children: ReactNode;
}

const JourneyStageStatus: FC<JourneyStageStatusProps> = ({ children }) => {
    return (
        <PlainText aria-live="polite">
            {children}
        </PlainText>
    );
};

JourneyStageStatus.displayName = "JourneyStageStatus";

export { JourneyStageStatus };
export type { JourneyStageStatusProps };
