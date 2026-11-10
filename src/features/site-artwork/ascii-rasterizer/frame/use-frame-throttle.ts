import { useCallback, useEffect, useMemo, useRef } from "react";

import { usePrefersReducedMotion } from "@shared/lib/hooks";

import { FRAME_INTERVAL } from "../constants.ts";

import type { AsciiGrid } from "../types.ts";


interface FrameThrottle {
    tick: (delta: number) => void;
    isDue: () => boolean;
    markDrawn: () => void;
}

type UseFrameThrottleReturn = FrameThrottle;

const useFrameThrottle = (grid: AsciiGrid | null): UseFrameThrottleReturn => {
    const isReducedMotion = usePrefersReducedMotion();
    const sinceDraw = useRef(Number.POSITIVE_INFINITY);
    const hasDrawn = useRef(false);

    useEffect(() => {
        sinceDraw.current = Number.POSITIVE_INFINITY;
        hasDrawn.current = false;
    }, [grid]);

    const tick = useCallback((delta: number) => {
        sinceDraw.current += delta;
    }, []);

    const isDue = useCallback((): boolean => {
        return !(isReducedMotion && hasDrawn.current) && sinceDraw.current >= FRAME_INTERVAL;
    }, [isReducedMotion]);

    const markDrawn = useCallback(() => {
        sinceDraw.current = 0;
        hasDrawn.current = true;
    }, []);

    return useMemo(() => {
        return { tick, isDue, markDrawn };
    }, [tick, isDue, markDrawn]);
};

export { useFrameThrottle };
export type { FrameThrottle, UseFrameThrottleReturn };
