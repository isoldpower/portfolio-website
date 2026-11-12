import { PlainText, Text } from "@shared/ui-toolkit/typography";
import { BAR_EMPTY_GLYPH, BAR_FILLED_GLYPH, LOADER_BAR_CELLS, PERCENT, PERCENT_WIDTH } from "../constants.ts";

import type { FC } from "react";


interface ProjectFrameLoaderBarProps {
    progress: number;
}

const ProjectFrameLoaderBar: FC<ProjectFrameLoaderBarProps> = ({ progress }) => {
    const filledCellCount = Math.round(progress * LOADER_BAR_CELLS);
    const filledCells = BAR_FILLED_GLYPH.repeat(filledCellCount);
    const emptyCells = BAR_EMPTY_GLYPH.repeat(LOADER_BAR_CELLS - filledCellCount);
    const percentValue = String(Math.round(progress * PERCENT)).padStart(PERCENT_WIDTH, " ");

    return (
        <PlainText className="flex gap-3.5">
            <Text tone="accent" className="[text-shadow:var(--text-shadow-soft)]">
                [{filledCells}{emptyCells}]
            </Text>
            <PlainText>
                {percentValue}%
            </PlainText>
        </PlainText>
    );
};

ProjectFrameLoaderBar.displayName = "ProjectFrameLoaderBar";

export { ProjectFrameLoaderBar };
export type { ProjectFrameLoaderBarProps };
