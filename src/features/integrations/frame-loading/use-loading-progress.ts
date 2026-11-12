import { useEffect, useMemo, useState } from "react";

import { CREEP_CEILING, CREEP_TAU_MS, CREEP_TICK_MS, FADE_MS, READY_HOLD_MS } from "./constants.ts";

import type { FrameLoaderStage } from "@entities/integrations/project-frame";


interface UseLoadingProgressParams {
    key: string | undefined;
    isLoaded: boolean;
}

interface UseLoadingProgressReturn {
    progress: number;
    stage: Exclude<FrameLoaderStage, "waiting">;
    isHidden: boolean;
    isSettled: boolean;
}

interface KeyedValue<T> {
    key: string | undefined;
    value: T;
}

const useLoadingProgress = ({ key, isLoaded }: UseLoadingProgressParams): UseLoadingProgressReturn => {
    const [creepProgress, setCreepProgress] = useState<KeyedValue<number>>({ key, value: 0 });
    const [hiddenKey, setHiddenKey] = useState<string | undefined>(undefined);
    const [settledKey, setSettledKey] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (key === undefined || isLoaded) {
            return;
        }

        const creepStartedAt = performance.now();
        const creepTimer = setInterval(() => {
            const elapsedMs = performance.now() - creepStartedAt;
            setCreepProgress({ key, value: CREEP_CEILING * (1 - Math.exp(-elapsedMs / CREEP_TAU_MS)) });
        }, CREEP_TICK_MS);

        return () => {
            clearInterval(creepTimer);
        };
    }, [key, isLoaded]);

    useEffect(() => {
        if (key === undefined || !isLoaded) {
            return;
        }

        const hideTimer = setTimeout(() => {
            setHiddenKey(key);
        }, READY_HOLD_MS);
        const settleTimer = setTimeout(() => {
            setSettledKey(key);
        }, READY_HOLD_MS + FADE_MS);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(settleTimer);
        };
    }, [key, isLoaded]);

    const creepValue = creepProgress.key === key ? creepProgress.value : 0;

    return useMemo(() => {
        return {
            progress: isLoaded ? 1 : creepValue,
            stage: isLoaded ? "ready" : "loading",
            isHidden: isLoaded && hiddenKey === key,
            isSettled: isLoaded && settledKey === key,
        };
    }, [isLoaded, creepValue, hiddenKey, settledKey, key]);
};

export { useLoadingProgress };
export type { UseLoadingProgressParams, UseLoadingProgressReturn };
