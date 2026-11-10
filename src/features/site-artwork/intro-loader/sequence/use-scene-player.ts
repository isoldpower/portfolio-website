import { useCallback } from "react";

import { useIntroScene } from "../scene/use-intro-scene.ts";

import type { SceneOutcome, SceneStep } from "../types.ts";


type UseScenePlayerReturn = (steps: readonly SceneStep[]) => Promise<SceneOutcome>;

const useScenePlayer = (): UseScenePlayerReturn => {
    const { scene } = useIntroScene();

    const play: UseScenePlayerReturn = useCallback(async ([current, ...rest]) => {
        if (!current) {
            return "continue";
        }

        scene.enter(current.getName());
        const outcome = await current.execute();

        if (!scene.isAlive()) {
            return "abort";
        }
        if (outcome !== "continue") {
            return outcome;
        }

        return play(rest);
    }, [scene]);

    return play;
};

export { useScenePlayer };
export type { UseScenePlayerReturn };
