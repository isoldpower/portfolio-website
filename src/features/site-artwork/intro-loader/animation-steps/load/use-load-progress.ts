import { useCallback } from "react";
import { sleep } from "@shared/lib/utilities";

import {
    COMPLETE_PROGRESS,
    FONTS_PROGRESS_SHARE,
    LOAD_POLL_MS,
    LOAD_TIMEOUT_MS,
    MAX_PENDING_PROGRESS,
    MIN_LOAD_MS,
    MIN_PROGRESS_STEP,
    PAGE_PROGRESS_SHARE,
    PROGRESS_EASING,
    RABBIT_PROGRESS_SHARE,
} from "../../constants.ts";
import { useIntroStage } from "../../stage/use-intro-stage.ts";
import { useLoadSignals } from "./use-load-signals.ts";

import type { IsAlive } from "../../types.ts";
import type { LoadSignals } from "./use-load-signals.ts";


interface WaitForLoadParams {
    onProgress: (progress: number) => void;
    isAlive: IsAlive;
}

interface LoadTarget {
    isDone: boolean;
    target: number;
}

type UseLoadProgressReturn = (params: WaitForLoadParams) => Promise<void>;

const useLoadProgress = (): UseLoadProgressReturn => {
    const stage = useIntroStage();
    const trackSignals = useLoadSignals();

    const loadTarget = useCallback(({ areFontsReady, isPageLoaded }: LoadSignals, elapsed: number): LoadTarget => {
        const isRabbitReady = !stage || stage.getRabbitCanvas() !== null;
        const isDone = elapsed > LOAD_TIMEOUT_MS || (isRabbitReady && areFontsReady && isPageLoaded);
        if (isDone) {
            return { isDone, target: 1 };
        }

        const pending = (areFontsReady ? FONTS_PROGRESS_SHARE : 0)
            + (isPageLoaded ? PAGE_PROGRESS_SHARE : 0)
            + RABBIT_PROGRESS_SHARE * (stage?.getRabbitProgress() ?? 1);
        return { isDone, target: Math.min(MAX_PENDING_PROGRESS, pending) };
    }, [stage]);

    const advance = useCallback((progress: number, target: number): number => {
        return Math.min(target, progress + Math.max(MIN_PROGRESS_STEP, (target - progress) * PROGRESS_EASING));
    }, []);

    return useCallback(async ({ onProgress, isAlive }) => {
        const startedAt = performance.now();
        const signals = trackSignals();
        let progress = 0;

        while (isAlive()) {
            const elapsed = performance.now() - startedAt;
            const { isDone, target } = loadTarget(signals, elapsed);
            progress = advance(progress, target);
            onProgress(progress);

            if (isDone && progress > COMPLETE_PROGRESS && elapsed > MIN_LOAD_MS) {
                return;
            }

            await sleep(LOAD_POLL_MS);
        }
    }, [trackSignals, loadTarget, advance]);
};

export { useLoadProgress };
export type { UseLoadProgressReturn, WaitForLoadParams };
