import { useCallback, useMemo } from "react";

import { usePrefersReducedMotion } from "@shared/lib/hooks";

import { SKIP_FADE_MS, SKIP_SCROLL_Y } from "../../constants.ts";
import { useIntroScene } from "../../scene/use-intro-scene.ts";

import type { SceneStep } from "../../types.ts";


type UseSkipStepReturn = SceneStep;

const useSkipStep = (): UseSkipStepReturn => {
    const { scene, refs } = useIntroScene();
    const isReducedMotion = usePrefersReducedMotion();

    const shouldSkip = useCallback((): boolean => {
        return !scene.rabbitCanvas || isReducedMotion || window.scrollY > SKIP_SCROLL_Y;
    }, [scene, isReducedMotion]);

    const fadeOutScreen = useCallback(async () => {
        await refs.screen.current?.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: SKIP_FADE_MS, easing: "ease-out", fill: "forwards" }
        ).finished;
    }, [refs]);

    return useMemo((): SceneStep => {
        return {
            getName: () => {
                return "load";
            },
            execute: async () => {
                if (!shouldSkip()) {
                    return "continue";
                }

                await fadeOutScreen();
                return "skip";
            },
        };
    }, [shouldSkip, fadeOutScreen]);
};

export { useSkipStep };
export type { UseSkipStepReturn };
