import { useContext } from "react";

import { IntroSceneContext } from "./intro-scene-context.ts";

import type { IntroSceneValue } from "../types.ts";


type UseIntroSceneReturn = IntroSceneValue;

const useIntroScene = (): UseIntroSceneReturn => {
    const value = useContext(IntroSceneContext);
    if (!value) {
        throw new Error("useIntroScene must be used inside IntroSceneProvider");
    }

    return value;
};

export { useIntroScene };
export type { UseIntroSceneReturn };
