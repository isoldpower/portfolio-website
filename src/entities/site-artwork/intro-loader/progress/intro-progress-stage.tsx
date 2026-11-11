import { Text } from "@shared/ui-toolkit/typography";

import type { IntroStageLabel } from "../types.ts";
import type { FC } from "react";


interface IntroProgressStageProps {
    stage: IntroStageLabel;
}

const IntroProgressStage: FC<IntroProgressStageProps> = ({ stage }) => {
    return (
        <Text>
            {`> _t(intro.stages.${stage})`}
        </Text>
    );
};

IntroProgressStage.displayName = "IntroProgressStage";

export { IntroProgressStage };
export type { IntroProgressStageProps };
