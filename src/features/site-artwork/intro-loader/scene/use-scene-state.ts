import { useState } from "react";

import { INITIAL_SCENE_VIEW } from "../constants.ts";
import { SceneState } from "./SceneState.ts";


interface UseSceneStateParams {
    gloss: string;
    isFinished: boolean;
}

type UseSceneStateReturn = SceneState;

const useSceneState = ({ gloss, isFinished }: UseSceneStateParams): UseSceneStateReturn => {
    const [scene] = useState(() => {
        return new SceneState({ ...INITIAL_SCENE_VIEW, gloss, isFinished });
    });

    return scene;
};

export { useSceneState };
export type { UseSceneStateParams, UseSceneStateReturn };
