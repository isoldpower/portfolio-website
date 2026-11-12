import { Text } from "@shared/ui-toolkit/typography";

import { PROGRESS_BAR_CELLS } from "../constants.ts";

import type { FC } from "react";


interface IntroProgressBarProps {
    progress: number;
}

const IntroProgressBar: FC<IntroProgressBarProps> = ({ progress }) => {
    const filled = Math.round(progress * PROGRESS_BAR_CELLS);

    return (
        <Text tone="accent">
            {`[${"#".repeat(filled)}${".".repeat(PROGRESS_BAR_CELLS - filled)}]`}
        </Text>
    );
};

IntroProgressBar.displayName = "IntroProgressBar";

export { IntroProgressBar };
export type { IntroProgressBarProps };
