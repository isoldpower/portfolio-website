import { useCallback, useMemo, useRef, useState } from "react";

import { FINISH_FADE, INITIAL_JOURNEY_STATE, START_MIDPOINT, STOP_RANGE } from "../constants.ts";
import {
    cameraDistanceToStop,
    cameraTravelEnd,
    isPanelLiveAt,
    stopHoldStart,
} from "../geometry/journey-geometry.ts";

import type { JourneyPhase, JourneyState } from "../types.ts";


interface UseJourneyStateReturn {
    journeyState: JourneyState;
    syncJourneyState: (cameraPosition: number) => void;
}

const isSameJourneyState = (previousState: JourneyState, nextState: JourneyState): boolean => {
    return previousState.phase === nextState.phase
        && previousState.activeStopIndex === nextState.activeStopIndex
        && previousState.reachedStopCount === nextState.reachedStopCount
        && previousState.livePanelIndex === nextState.livePanelIndex;
};

const useJourneyState = (stopCount: number): UseJourneyStateReturn => {
    const [journeyState, setJourneyState] = useState<JourneyState>(INITIAL_JOURNEY_STATE);
    const currentJourneyState = useRef<JourneyState>(INITIAL_JOURNEY_STATE);
    const stopIndices = useMemo(() => {
        return Array.from({ length: stopCount }, (_, stopIndex) => {
            return stopIndex;
        });
    }, [stopCount]);

    const nearestStopIndex = useCallback((cameraPosition: number): number => {
        return stopIndices.reduce((closestStopIndex, stopIndex) => {
            const stopDistance = cameraDistanceToStop(cameraPosition, stopIndex);
            const closestDistance = cameraDistanceToStop(cameraPosition, closestStopIndex);
            return stopDistance < closestDistance ? stopIndex : closestStopIndex;
        }, 0);
    }, [stopIndices]);

    const livePanelIndexAt = useCallback((cameraPosition: number): number | null => {
        return stopIndices.find((stopIndex) => {
            return isPanelLiveAt(cameraPosition, stopIndex);
        }) ?? null;
    }, [stopIndices]);

    const reachedStopCountAt = useCallback((cameraPosition: number): number => {
        return stopIndices.filter((stopIndex) => {
            return cameraPosition >= stopHoldStart(stopIndex);
        }).length;
    }, [stopIndices]);

    const journeyStateAt = useCallback((cameraPosition: number): JourneyState => {
        const journeyProgress = cameraPosition / cameraTravelEnd(stopCount);
        const isCrashed = journeyProgress >= FINISH_FADE[1];
        const isStarting = journeyProgress < START_MIDPOINT;
        const closestStopIndex = nearestStopIndex(cameraPosition);
        const isNearStop = cameraDistanceToStop(cameraPosition, closestStopIndex) < STOP_RANGE;
        const isAtStop = stopCount > 0 && !isStarting && !isCrashed && isNearStop;
        const isOutsideStops = isStarting || isCrashed;
        const journeyPhase: JourneyPhase = isCrashed
            ? "finish"
            : isStarting
                ? "start"
                : isAtStop ? "stop" : "travel";

        return {
            phase: journeyPhase,
            activeStopIndex: isAtStop ? closestStopIndex : null,
            reachedStopCount: isCrashed ? stopCount : reachedStopCountAt(cameraPosition),
            livePanelIndex: isOutsideStops ? null : livePanelIndexAt(cameraPosition),
        };
    }, [stopCount, nearestStopIndex, reachedStopCountAt, livePanelIndexAt]);

    const syncJourneyState = useCallback((cameraPosition: number) => {
        const nextJourneyState = journeyStateAt(cameraPosition);
        if (isSameJourneyState(currentJourneyState.current, nextJourneyState)) {
            return;
        }

        currentJourneyState.current = nextJourneyState;
        setJourneyState(nextJourneyState);
    }, [journeyStateAt]);

    return useMemo(() => {
        return { journeyState, syncJourneyState };
    }, [journeyState, syncJourneyState]);
};

export { useJourneyState };
export type { UseJourneyStateReturn };
