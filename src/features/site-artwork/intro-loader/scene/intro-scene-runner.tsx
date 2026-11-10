import { useCallback } from "react";

import { useIntroAnimationSteps } from "../animation-steps/use-intro-animation-steps.ts";
import { useScenePlayer } from "../sequence/use-scene-player.ts";
import { useSequenceLifecycle } from "../sequence/use-sequence-lifecycle.ts";
import { useIntroScene } from "./use-intro-scene.ts";
import { useSceneStageBridge } from "./use-scene-stage-bridge.ts";

import type { RunSequence } from "../types.ts";
import type { FC } from "react";


const IntroSceneRunner: FC = () => {
    const { scene } = useIntroScene();
    const play = useScenePlayer();
    const steps = useIntroAnimationSteps();

    const runSequence: RunSequence = useCallback(async (isAlive, finish) => {
        scene.begin(isAlive);
        const outcome = await play(steps);

        if (outcome !== "abort") {
            finish(outcome === "continue");
        }
    }, [scene, play, steps]);

    useSceneStageBridge();
    useSequenceLifecycle(runSequence);

    return null;
};

IntroSceneRunner.displayName = "IntroSceneRunner";

export { IntroSceneRunner };
