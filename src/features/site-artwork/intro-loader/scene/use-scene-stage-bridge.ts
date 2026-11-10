import { useEffect } from "react";

import { useIntroStage } from "../stage/use-intro-stage.ts";
import { useIntroScene } from "./use-intro-scene.ts";


const useSceneStageBridge = (): void => {
    const store = useIntroStage();
    const { scene } = useIntroScene();

    useEffect(() => {
        const stopEnter = scene.onEnter((step) => {
            store?.setPhase(step);
        });
        const stopFinish = scene.onFinish((isStaggered) => {
            store?.setPhase("done", isStaggered);
        });

        return () => {
            stopEnter();
            stopFinish();
        };
    }, [scene, store]);
};

export { useSceneStageBridge };
