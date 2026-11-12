import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { zeroPad } from "@shared/lib/utilities";

import { EMPTY_LOCATION, ORDER_DIGITS, SCORE_DIGITS } from "../constants.ts";
import { useJourney } from "../context/use-journey.ts";


interface UseJourneyHudReturn {
    statusText: string;
    hintText: string;
}

const useJourneyHud = (): UseJourneyHudReturn => {
    const { t } = useTranslation();
    const { journeyStops, journeyState } = useJourney();
    const stopCount = journeyStops.length;

    const scoreStatusText = useCallback((): string => {
        return t("journey.score", {
            high: zeroPad(stopCount, SCORE_DIGITS),
            current: zeroPad(journeyState.phase === "finish" ? stopCount : 0, SCORE_DIGITS),
        });
    }, [t, stopCount, journeyState.phase]);

    const locationStatusText = useCallback((): string => {
        return t("journey.location", {
            current: journeyState.activeStopIndex === null
                ? EMPTY_LOCATION
                : zeroPad(journeyState.activeStopIndex + 1, ORDER_DIGITS),
            total: zeroPad(stopCount, ORDER_DIGITS),
        });
    }, [t, stopCount, journeyState.activeStopIndex]);

    const isOutsideStops = journeyState.phase === "start" || journeyState.phase === "finish";
    const statusText = isOutsideStops ? scoreStatusText() : locationStatusText();
    const hintText = t(
        journeyState.phase === "finish" ? "journey.hint_done" : "journey.hint"
    );

    return useMemo(() => {
        return { statusText, hintText };
    }, [statusText, hintText]);
};

export { useJourneyHud };
export type { UseJourneyHudReturn };
