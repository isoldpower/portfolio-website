import { useCallback } from "react";

import { FADE_EASE, FINISH_FADE, SHADE_OPACITY, START_FADE } from "../constants.ts";

import type { JourneyTweenBuilder } from "../types.ts";


type UseOverlayTweensReturn = JourneyTweenBuilder;

const useOverlayTweens = (): UseOverlayTweensReturn => {
    return useCallback(({ timeline, selectElements, travelEnd }) => {
        const startFadeAt = START_FADE[0] * travelEnd;
        const startFadeDuration = (START_FADE[1] - START_FADE[0]) * travelEnd;
        const finishFadeAt = FINISH_FADE[0] * travelEnd;
        const finishFadeDuration = (FINISH_FADE[1] - FINISH_FADE[0]) * travelEnd;

        timeline.fromTo(
            selectElements('[data-journey="start"]'),
            { opacity: 1 },
            { opacity: 0, duration: startFadeDuration, ease: FADE_EASE },
            startFadeAt
        );
        timeline.fromTo(
            selectElements('[data-journey="panels"]'),
            { opacity: 0 },
            { opacity: 1, duration: startFadeDuration, ease: FADE_EASE },
            startFadeAt
        );
        timeline.to(
            selectElements('[data-journey="panels"]'),
            { opacity: 0, duration: finishFadeDuration, ease: FADE_EASE },
            finishFadeAt
        );
        timeline.fromTo(
            selectElements('[data-journey="finish"]'),
            { opacity: 0 },
            { opacity: 1, duration: finishFadeDuration, ease: FADE_EASE },
            finishFadeAt
        );
        timeline.fromTo(
            selectElements('[data-journey="shade"]'),
            { opacity: SHADE_OPACITY },
            { opacity: 0, duration: finishFadeDuration, ease: FADE_EASE },
            finishFadeAt
        );
        timeline.fromTo(
            selectElements('[data-journey="bar-fill"]'),
            { scaleX: 0 },
            { scaleX: 1, duration: travelEnd },
            0
        );
        timeline.fromTo(
            selectElements('[data-journey="mini-rabbit"]'),
            { left: "0%" },
            { left: "100%", duration: travelEnd },
            0
        );
    }, []);
};

export { useOverlayTweens };
export type { UseOverlayTweensReturn };
