import { useCallback } from "react";

import { FADE_EASE, SCENE_FADE, TRAVEL_LENGTH } from "../constants.ts";
import { stopHoldEnd, stopHoldStart } from "../geometry/journey-geometry.ts";

import type { JourneyTweenBuilder } from "../types.ts";


type UseSceneryTweensReturn = JourneyTweenBuilder;

const useSceneryTweens = (): UseSceneryTweensReturn => {
    return useCallback(({ timeline, selectElements, stopCount }) => {
        const nearFadeDistance = SCENE_FADE[0] * TRAVEL_LENGTH;
        const farFadeDistance = SCENE_FADE[1] * TRAVEL_LENGTH;
        const fadeDuration = farFadeDistance - nearFadeDistance;

        Array.from({ length: stopCount }, (_, stopIndex) => {
            return stopIndex;
        }).forEach((stopIndex) => {
            const sceneElements = selectElements(`[data-journey-scene="${String(stopIndex)}"]`);
            timeline.fromTo(
                sceneElements,
                { opacity: 0 },
                { opacity: 1, duration: fadeDuration, ease: FADE_EASE },
                stopHoldStart(stopIndex) - farFadeDistance
            );
            timeline.to(
                sceneElements,
                { opacity: 0, duration: fadeDuration, ease: FADE_EASE },
                stopHoldEnd(stopIndex) + nearFadeDistance
            );
        });

        if (stopCount > 0) {
            const meadowElements = selectElements('[data-journey-scene="meadow"]');
            timeline.fromTo(
                meadowElements,
                { opacity: 1 },
                { opacity: 0, duration: fadeDuration, ease: FADE_EASE },
                stopHoldStart(0) - farFadeDistance
            );
            timeline.to(
                meadowElements,
                { opacity: 1, duration: fadeDuration, ease: FADE_EASE },
                stopHoldEnd(stopCount - 1) + nearFadeDistance
            );
        }
    }, []);
};

export { useSceneryTweens };
export type { UseSceneryTweensReturn };
