import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useIntroScene } from "../../scene/use-intro-scene.ts";
import { useGlossScramble } from "./use-gloss-scramble.ts";
import { useRabbitSnapshot } from "./use-rabbit-snapshot.ts";
import { useSnapshotReveal } from "./use-snapshot-reveal.ts";

import type { IsAlive, SceneStep } from "../../types.ts";


type UseMorphStepReturn = SceneStep;

const useMorphStep = (): UseMorphStepReturn => {
    const { scene } = useIntroScene();
    const { t } = useTranslation();
    const snapshotRabbit = useRabbitSnapshot();
    const runScramble = useGlossScramble(t("intro.gloss"));
    const runReveal = useSnapshotReveal();

    const runMorph = useCallback(async (
        rabbitCanvas: HTMLCanvasElement,
        isAlive: IsAlive
    ) => {
        scene.shot = snapshotRabbit(rabbitCanvas);
        await runScramble(isAlive);
        if (scene.shot && isAlive()) {
            await runReveal(scene.shot);
        }
    }, [scene, snapshotRabbit, runScramble, runReveal]);

    return useMemo((): SceneStep => {
        return {
            getName: () => {
                return "morph";
            },
            execute: async (isAlive) => {
                if (!scene.rabbitCanvas) {
                    return "skip";
                }

                await runMorph(scene.rabbitCanvas, isAlive);
                return "continue";
            },
        };
    }, [scene, runMorph]);
};

export { useMorphStep };
export type { UseMorphStepReturn };
