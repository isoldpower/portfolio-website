import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { zeroPad } from "@shared/lib/utilities";

import { ORDER_DIGITS } from "../constants.ts";
import { useJourney } from "../context/use-journey.ts";

import type { JourneyOverlayKind } from "@entities/projects/journey-overlay";


interface UseJourneyOverlayReturn {
    titleText: string;
    noteText: string;
    actionText: string;
    isInteractive: boolean;
}

const useJourneyOverlay = (overlayKind: JourneyOverlayKind): UseJourneyOverlayReturn => {
    const { t } = useTranslation();
    const { journeyStops, journeyState } = useJourney();
    const locationAmount = zeroPad(journeyStops.length, ORDER_DIGITS);

    return useMemo(() => {
        return {
            titleText: t(`journey.${overlayKind}.title`),
            noteText: t(`journey.${overlayKind}.note`, { amount: locationAmount }),
            actionText: t(`journey.${overlayKind}.action`),
            isInteractive: journeyState.phase === overlayKind,
        };
    }, [t, overlayKind, locationAmount, journeyState.phase]);
};

export { useJourneyOverlay };
export type { UseJourneyOverlayReturn };
