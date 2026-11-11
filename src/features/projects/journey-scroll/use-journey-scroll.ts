import { useCallback, useMemo } from "react";

import { usePrefersReducedMotion } from "@shared/lib/hooks";

import { FINISH_FADE } from "./constants.ts";
import { cameraTravelEnd } from "./geometry/journey-geometry.ts";
import { useRabbitMotion } from "./motion/use-rabbit-motion.ts";
import { useJourneyJump } from "./navigation/use-journey-jump.ts";
import { useJourneyState } from "./state/use-journey-state.ts";
import { useJourneyTimeline } from "./timeline/use-journey-timeline.ts";

import type { JourneyScrollFrame, JourneyState } from "./types.ts";
import type { RefObject } from "react";


interface UseJourneyScrollParams {
    stageRef: RefObject<HTMLElement | null>;
    stopCount: number;
}

interface UseJourneyScrollReturn {
    journeyState: JourneyState;
    jumpToStop: (stopIndex: number) => void;
}

const useJourneyScroll = ({ stageRef, stopCount }: UseJourneyScrollParams): UseJourneyScrollReturn => {
    const isReducedMotion = usePrefersReducedMotion();
    const { journeyState, syncJourneyState } = useJourneyState(stopCount);
    const { moveRabbit, stopRabbit } = useRabbitMotion();

    const handleScroll = useCallback((scrollFrame: JourneyScrollFrame) => {
        const { frameElement, selectElements, scrollProgress, scrollDirection } = scrollFrame;
        const cameraPosition = scrollProgress * cameraTravelEnd(stopCount);
        const isCrashed = scrollProgress >= FINISH_FADE[1];

        syncJourneyState(cameraPosition);
        moveRabbit({
            frameElement,
            selectElements,
            cameraPosition,
            scrollDirection,
            isRunning: !isReducedMotion && !isCrashed && cameraPosition > 0,
        });
    }, [stopCount, isReducedMotion, syncJourneyState, moveRabbit]);

    const scrollTriggerRef = useJourneyTimeline({
        stageRef,
        stopCount,
        onScroll: handleScroll,
        onTeardown: stopRabbit,
    });
    const jumpToStop = useJourneyJump({ scrollTriggerRef, stopCount });

    return useMemo(() => {
        return { journeyState, jumpToStop };
    }, [journeyState, jumpToStop]);
};

export { useJourneyScroll };
export type { UseJourneyScrollParams, UseJourneyScrollReturn };
