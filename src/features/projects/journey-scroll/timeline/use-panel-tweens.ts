import { useCallback } from "react";

import {
    APPROACH_EASE,
    DEPART_EASE,
    FADE_EASE,
    HOLD_LENGTH,
    PANEL_APPROACH,
    PANEL_DEPART,
    PANEL_SHIFT,
    SHOT_MARKERS,
    SHOT_MIX,
    SHOT_SHIFT,
    VIEW_DIM
} from "../constants.ts";
import { stopHoldEnd, stopHoldStart } from "../geometry/journey-geometry.ts";

import type { JourneyTimelineContext, JourneyTweenBuilder } from "../types.ts";


type UsePanelTweensReturn = JourneyTweenBuilder;

const usePanelTweens = (): UsePanelTweensReturn => {
    const addPanelTravel = useCallback((timelineContext: JourneyTimelineContext, stopIndex: number) => {
        const { timeline, selectElements, travelEnd } = timelineContext;
        const panelElements = selectElements(`[data-journey-panel="${String(stopIndex)}"]`);
        const departDuration = Math.min(PANEL_DEPART, travelEnd - stopHoldEnd(stopIndex));

        timeline.fromTo(
            panelElements,
            { x: PANEL_SHIFT, opacity: 0 },
            { x: 0, opacity: 1, duration: PANEL_APPROACH, ease: APPROACH_EASE },
            stopHoldStart(stopIndex) - PANEL_APPROACH
        );
        timeline.to(
            panelElements,
            { x: -PANEL_SHIFT, opacity: 0, duration: departDuration, ease: DEPART_EASE },
            stopHoldEnd(stopIndex)
        );
    }, []);

    const addScreenshotMix = useCallback((timelineContext: JourneyTimelineContext, stopIndex: number) => {
        const { timeline, selectElements } = timelineContext;
        const [firstShotElements, secondShotElements] = SHOT_MARKERS.map((shotOrder) => {
            return selectElements(`[data-journey-shot="${String(stopIndex)}-${String(shotOrder)}"]`);
        });
        const [firstViewElements, secondViewElements] = SHOT_MARKERS.map((shotOrder) => {
            return selectElements(`[data-journey-view="${String(stopIndex)}-${String(shotOrder)}"]`);
        });
        if (!firstShotElements || !secondShotElements?.length) {
            return;
        }

        const mixStartAt = stopHoldStart(stopIndex) + SHOT_MIX[0] * HOLD_LENGTH;
        const mixDuration = (SHOT_MIX[1] - SHOT_MIX[0]) * HOLD_LENGTH;

        timeline.fromTo(
            firstShotElements,
            { opacity: 1, y: 0 },
            { opacity: 0, y: -SHOT_SHIFT, duration: mixDuration, ease: FADE_EASE },
            mixStartAt
        );
        timeline.fromTo(
            secondShotElements,
            { opacity: 0, y: SHOT_SHIFT },
            { opacity: 1, y: 0, duration: mixDuration, ease: FADE_EASE },
            mixStartAt
        );
        timeline.fromTo(
            firstViewElements ?? [],
            { opacity: 1 },
            { opacity: VIEW_DIM, duration: mixDuration, ease: FADE_EASE },
            mixStartAt
        );
        timeline.fromTo(
            secondViewElements ?? [],
            { opacity: VIEW_DIM },
            { opacity: 1, duration: mixDuration, ease: FADE_EASE },
            mixStartAt
        );
    }, []);

    return useCallback((timelineContext) => {
        Array.from({ length: timelineContext.stopCount }, (_, stopIndex) => {
            return stopIndex;
        }).forEach((stopIndex) => {
            addPanelTravel(timelineContext, stopIndex);
            addScreenshotMix(timelineContext, stopIndex);
        });
    }, [addPanelTravel, addScreenshotMix]);
};

export { usePanelTweens };
export type { UsePanelTweensReturn };
