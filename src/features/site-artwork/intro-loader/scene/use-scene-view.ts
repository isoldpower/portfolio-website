import { useSyncExternalStore } from "react";

import { useIntroScene } from "./use-intro-scene.ts";

import type { SceneView } from "../types.ts";


type UseSceneViewReturn = SceneView;

const useSceneView = (): UseSceneViewReturn => {
    const { scene } = useIntroScene();

    return useSyncExternalStore(scene.subscribe, scene.getView, scene.getView);
};

export { useSceneView };
export type { UseSceneViewReturn };
