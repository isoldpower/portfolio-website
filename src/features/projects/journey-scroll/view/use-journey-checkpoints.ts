import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { zeroPad } from "@shared/lib/utilities";

import { ORDER_DIGITS, PERCENT } from "../constants.ts";
import { useJourney } from "../context/use-journey.ts";
import { checkpointTrackPosition } from "../geometry/journey-geometry.ts";

import type { JourneyCheckpointState } from "@entities/projects/journey-checkpoint";
import type { JourneyStop } from "@entities/projects/model";


interface JourneyCheckpointView {
    key: string;
    checkpointName: string;
    ariaLabel: string;
    trackPosition: number;
    checkpointState: JourneyCheckpointState;
    jumpToCheckpoint: () => void;
}

interface UseJourneyCheckpointsReturn {
    progressPercent: number;
    isJourneyFinished: boolean;
    checkpointViews: readonly JourneyCheckpointView[];
}

const useJourneyCheckpoints = (): UseJourneyCheckpointsReturn => {
    const { t } = useTranslation();
    const { journeyStops, journeyState, jumpToStop } = useJourney();
    const stopCount = journeyStops.length;

    const checkpointStateOf = useCallback((stopIndex: number): JourneyCheckpointState => {
        if (journeyState.activeStopIndex === stopIndex) {
            return "current";
        }

        return stopIndex < journeyState.reachedStopCount ? "reached" : "pending";
    }, [journeyState.activeStopIndex, journeyState.reachedStopCount]);

    const checkpointViewOf = useCallback((journeyStop: JourneyStop, stopIndex: number): JourneyCheckpointView => {
        const checkpointName = `${zeroPad(stopIndex + 1, ORDER_DIGITS)} ${journeyStop.checkpoint}`;
        const checkpointState = checkpointStateOf(stopIndex);
        const ariaLabelKey = checkpointState === "pending" ? "journey.checkpoint" : "journey.checkpoint_reached";

        return {
            key: journeyStop.key,
            checkpointName,
            ariaLabel: t(ariaLabelKey, { name: checkpointName }),
            trackPosition: checkpointTrackPosition(stopIndex, stopCount),
            checkpointState,
            jumpToCheckpoint: () => {
                jumpToStop(stopIndex);
            },
        };
    }, [t, stopCount, checkpointStateOf, jumpToStop]);

    const checkpointViews = useMemo(() => {
        return journeyStops.map(checkpointViewOf);
    }, [journeyStops, checkpointViewOf]);

    const progressPercent = stopCount > 0 ? Math.round(journeyState.reachedStopCount / stopCount * PERCENT) : 0;

    return useMemo(() => {
        return {
            progressPercent,
            isJourneyFinished: journeyState.phase === "finish",
            checkpointViews
        };
    }, [progressPercent, journeyState.phase, checkpointViews]);
};

export { useJourneyCheckpoints };
export type { JourneyCheckpointView, UseJourneyCheckpointsReturn };
