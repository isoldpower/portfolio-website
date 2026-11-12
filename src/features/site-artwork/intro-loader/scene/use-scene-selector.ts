import { useSyncExternalStore } from "react";

import { useIntroScene } from "./use-intro-scene.ts";

import type { SceneView } from "../types.ts";


const useSceneSelector = <Selected>(select: (view: SceneView) => Selected): Selected => {
    const { scene } = useIntroScene();
    const read = (): Selected => {
        return select(scene.getView());
    };

    return useSyncExternalStore(scene.subscribe, read, read);
};

export { useSceneSelector };
