import { PlainText } from "@shared/ui-toolkit/typography";

import { PERCENT, PERCENT_WIDTH } from "../constants.ts";

import type { FC } from "react";


interface IntroProgressPercentProps {
    progress: number;
}

const IntroProgressPercent: FC<IntroProgressPercentProps> = ({ progress }) => {
    const percent = Math.round(progress * PERCENT);

    return (
        <PlainText>
            {`${percent.toString().padStart(PERCENT_WIDTH, " ")}%`}
        </PlainText>
    );
};

IntroProgressPercent.displayName = "IntroProgressPercent";

export { IntroProgressPercent };
export type { IntroProgressPercentProps };
