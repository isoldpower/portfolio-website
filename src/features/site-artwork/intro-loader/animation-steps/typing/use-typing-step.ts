import { useCallback, useMemo } from "react";

import { sleep } from "@shared/lib/utilities";

import { TYPE_BASE_MS, TYPE_HOLD_MS, TYPE_JITTER_MS } from "../../constants.ts";
import { useIntroScene } from "../../scene/use-intro-scene.ts";
import { useTicker } from "../../sequence/use-ticker.ts";

import type { SceneStep } from "../../types.ts";


type UseTypingStepReturn = SceneStep;

const useTypingStep = (): UseTypingStepReturn => {
    const { scene, names } = useIntroScene();
    const word = `${names.firstName} `;
    const tick = useTicker();

    const keystrokeDelay = useCallback((): number => {
        return TYPE_BASE_MS + Math.random() * TYPE_JITTER_MS;
    }, []);

    const typeUpTo = useCallback((length: number) => {
        scene.updateView({ typed: word.slice(0, length) });
    }, [scene, word]);

    const runTyping = useCallback(async () => {
        await tick({ count: word.length, isAlive: scene.isAlive, onTick: typeUpTo, delay: keystrokeDelay });
        await sleep(TYPE_HOLD_MS);
    }, [scene, tick, word, typeUpTo, keystrokeDelay]);

    return useMemo((): SceneStep => {
        return {
            getName: () => {
                return "type";
            },
            execute: async () => {
                await runTyping();
                return "continue";
            },
        };
    }, [runTyping]);
};

export { useTypingStep };
export type { UseTypingStepReturn };
