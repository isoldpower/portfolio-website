import { useCallback, useMemo } from "react";

import {
    BURIED_CARROT_OFFSET,
    MEADOW_DECORATIONS,
    MEADOW_FINISH_LANDMARKS,
    MEADOW_REPEAT,
    MEADOW_START_LANDMARKS,
    MEADOW_VIEW,
    SCENE_FADE,
    TRAVEL_LENGTH,
} from "../constants.ts";
import { useJourney } from "../context/use-journey.ts";
import { cameraTravelEnd, stopHoldEnd, stopHoldStart } from "../geometry/journey-geometry.ts";

import type { MeadowItem } from "../types.ts";


type VisibleRange = readonly [number, number];

interface UseJourneyMeadowReturn {
    meadowItems: readonly MeadowItem[];
    buriedCarrotX: number;
}

const useJourneyMeadow = (): UseJourneyMeadowReturn => {
    const { journeyStops } = useJourney();
    const stopCount = journeyStops.length;
    const travelEnd = cameraTravelEnd(stopCount);

    const visibleRanges = useCallback((): VisibleRange[] => {
        const [viewBeforeX, viewAfterX] = MEADOW_VIEW;
        const sceneFadeIn = SCENE_FADE[1] * TRAVEL_LENGTH;
        if (stopCount === 0) {
            return [[viewBeforeX, travelEnd + viewAfterX]];
        }

        return [
            [viewBeforeX, stopHoldStart(0) - sceneFadeIn + viewAfterX],
            [stopHoldEnd(stopCount - 1) + sceneFadeIn + viewBeforeX, travelEnd + viewAfterX],
        ];
    }, [stopCount, travelEnd]);

    const repeatedDecorations = useCallback((): MeadowItem[] => {
        const repeatCount = Math.ceil((travelEnd + MEADOW_VIEW[1]) / MEADOW_REPEAT) + 1;
        const repeatIndices = Array.from({ length: repeatCount }, (_, repeatOrder) => {
            return repeatOrder - 1;
        });

        return repeatIndices.flatMap((repeatIndex) => {
            return MEADOW_DECORATIONS.map(([spriteName, offsetX], decorationOrder) => {
                return {
                    key: `${spriteName}-${String(repeatIndex)}-${String(decorationOrder)}`,
                    spriteName,
                    worldX: repeatIndex * MEADOW_REPEAT + offsetX
                };
            });
        });
    }, [travelEnd]);

    const layoutMeadow = useCallback((): MeadowItem[] => {
        const ranges = visibleRanges();
        const isItemVisible = (meadowItem: MeadowItem): boolean => {
            return ranges.some(([rangeStartX, rangeEndX]) => {
                return meadowItem.worldX >= rangeStartX && meadowItem.worldX <= rangeEndX;
            });
        };
        const finishLandmarks = MEADOW_FINISH_LANDMARKS.map((finishLandmark) => {
            return { ...finishLandmark, worldX: travelEnd + finishLandmark.worldX };
        });

        return [
            ...repeatedDecorations().filter(isItemVisible),
            ...MEADOW_START_LANDMARKS,
            ...finishLandmarks
        ];
    }, [travelEnd, visibleRanges, repeatedDecorations]);

    const meadowItems = useMemo(() => {
        return layoutMeadow();
    }, [layoutMeadow]);

    return useMemo(() => ({
        meadowItems,
        buriedCarrotX: travelEnd + BURIED_CARROT_OFFSET
    }), [meadowItems, travelEnd]);
};

export { useJourneyMeadow };
export type { UseJourneyMeadowReturn };
