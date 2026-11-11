import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyStageHintProps {
    children: ReactNode;
}

const JourneyStageHint: FC<JourneyStageHintProps> = ({ children }) => {
    return (
        <Text tone="strong" className="[text-shadow:0_0_8px_rgba(22,26,34,0.9)] max-sm:hidden">
            {children}
        </Text>
    );
};

JourneyStageHint.displayName = "JourneyStageHint";

export { JourneyStageHint };
export type { JourneyStageHintProps };
