import { useCallback, useMemo } from "react";

import { sleep } from "@shared/lib/utilities";

import { SETTLE_AFTER_LOAD_MS, STAGE_THRESHOLDS } from "../../constants.ts";
import { useIntroScene } from "../../scene/use-intro-scene.ts";
import { useIntroStage } from "../../stage/use-intro-stage.ts";
import { useLoadProgress } from "./use-load-progress.ts";

import type { IntroStageLabel } from "@entities/site-artwork/intro-loader";
import type { SceneStep } from "../../types.ts";


type UseLoadStepReturn = SceneStep;

const useLoadStep = (): UseLoadStepReturn => {
    const { scene } = useIntroScene();
    const store = useIntroStage();
    const waitForLoad = useLoadProgress();

    const stageOf = useCallback((progress: number): IntroStageLabel => {
        return STAGE_THRESHOLDS.find(({ below }) => {
            return progress < below;
        })?.label ?? "ready";
    }, []);

    const reportProgress = useCallback((progress: number) => {
        scene.updateView({ progress, stage: stageOf(progress) });
    }, [scene, stageOf]);

    const runLoad = useCallback(async () => {
        await waitForLoad({ onProgress: reportProgress, isAlive: scene.isAlive });
        if (!scene.isAlive()) {
            return;
        }

        reportProgress(1);
        await sleep(SETTLE_AFTER_LOAD_MS);
    }, [scene, waitForLoad, reportProgress]);

    return useMemo((): SceneStep => {
        return {
            getName: () => {
                return "load";
            },
            execute: async () => {
                await runLoad();
                scene.rabbitCanvas = store?.getRabbitCanvas() ?? null;
                return "continue";
            },
        };
    }, [scene, store, runLoad]);
};

export { useLoadStep };
export type { UseLoadStepReturn };
