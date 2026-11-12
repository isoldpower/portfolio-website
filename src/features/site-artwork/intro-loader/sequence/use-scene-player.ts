import { useCallback } from "react";

import { useIntroScene } from "../scene/use-intro-scene.ts";

import type { IsAlive, SceneOutcome, SceneStep } from "../types.ts";


type UseScenePlayerReturn = (steps: readonly SceneStep[], isAlive: IsAlive) => Promise<SceneOutcome>;

const useScenePlayer = (): UseScenePlayerReturn => {
    const { scene } = useIntroScene();

    const play: UseScenePlayerReturn = useCallback(async (
        [current, ...rest],
        isAlive
    ) => {
        if (!current) {
            return "continue";
        }

        scene.enter(current.getName());
        const outcome = await current.execute(isAlive);

        if (!isAlive()) {
            return "abort";
        } else if (outcome !== "continue") {
            return outcome;
        }

        return play(rest, isAlive);
    }, [scene]);

    return play;
};

export { useScenePlayer };
export type { UseScenePlayerReturn };
