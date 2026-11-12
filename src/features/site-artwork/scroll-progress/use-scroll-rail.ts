import { useCallback, useMemo } from "react";

import { RAIL_CELLS } from "./constants.ts";
import { useActiveSection } from "./use-active-section.ts";
import { usePageProgress } from "./use-page-progress.ts";


interface RailCellView {
    key: string;
    isLit: boolean;
    isHead: boolean;
    isMark: boolean;
}

interface UseScrollRailReturn {
    cells: readonly RailCellView[];
    percentText: string;
    sectionText: string;
}

const useScrollRail = (sectionIds: readonly string[]): UseScrollRailReturn => {
    const percent = usePageProgress();
    const { activeIndex, sectionCount, sectionStarts } = useActiveSection(sectionIds);
    const litCount = Math.round((percent / 100) * RAIL_CELLS);

    const markCells = useMemo(() => {
        return new Set(sectionStarts.map((start) => {
            return Math.round(start * (RAIL_CELLS - 1));
        }));
    }, [sectionStarts]);

    const buildCells = useCallback(() => {
        return Array.from({ length: RAIL_CELLS }, (_, index) => {
            return {
                key: `cell-${String(index)}`,
                isLit: index < litCount,
                isHead: litCount > 0 && index === litCount - 1,
                isMark: markCells.has(index),
            };
        });
    }, [litCount, markCells]);

    const cells = useMemo(() => buildCells(), [buildCells]);
    const percentText = `${String(percent).padStart(3, "0")}%`;
    const sectionText = `${String(activeIndex + 1).padStart(2, "0")}/${String(sectionCount).padStart(2, "0")}`;

    return { cells, percentText, sectionText };
};

export { useScrollRail };
export type { UseScrollRailReturn, RailCellView };
