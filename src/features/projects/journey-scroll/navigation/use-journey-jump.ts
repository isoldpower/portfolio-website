import { useCallback } from "react";

import { usePrefersReducedMotion } from "@shared/lib/hooks";

import { cameraTravelEnd, pinnedScrollDistance, stopHoldMiddle } from "../geometry/journey-geometry.ts";

import type { RefObject } from "react";


interface UseJourneyJumpParams {
    scrollTriggerRef: RefObject<ScrollTrigger | null>;
    stopCount: number;
}

type UseJourneyJumpReturn = (stopIndex: number) => void;

const useJourneyJump = ({
    scrollTriggerRef,
    stopCount
}: UseJourneyJumpParams): UseJourneyJumpReturn => {
    const isReducedMotion = usePrefersReducedMotion();

    return useCallback((stopIndex: number) => {
        const scrollTrigger = scrollTriggerRef.current;
        if (!scrollTrigger) {
            return;
        }

        const stopShare = stopHoldMiddle(stopIndex) / cameraTravelEnd(stopCount);
        window.scrollTo({
            top: scrollTrigger.start + pinnedScrollDistance(stopCount) * stopShare,
            behavior: isReducedMotion ? "auto" : "smooth",
        });
    }, [scrollTriggerRef, stopCount, isReducedMotion]);
};

export { useJourneyJump };
export type { UseJourneyJumpParams, UseJourneyJumpReturn };
