import { useCallback, useEffect, useRef } from "react";

import { useIntroScene } from "../scene/use-intro-scene.ts";
import { useIntroStage } from "../stage/use-intro-stage.ts";
import { useScrollLock } from "./use-scroll-lock.ts";

import type { RunSequence } from "../types.ts";


const useSequenceLifecycle = (run: RunSequence): void => {
    const store = useIntroStage();
    const { scene, refs } = useIntroScene();
    const lockScroll = useScrollLock();
    const isMounted = useRef(false);

    const settleOrphanedStage = useCallback(() => {
        setTimeout(() => {
            if (!isMounted.current && store?.getSnapshot().phase !== "done") {
                store?.setPhase("done");
            }
        }, 0);
    }, [store]);

    useEffect(() => {
        isMounted.current = true;

        if (!store || store.getSnapshot().phase === "done") {
            scene.updateView({ isFinished: true });
            return;
        }

        refs.screen.current?.style.setProperty("animation", "none");

        let isAlive = true;
        const unlockScroll = lockScroll();

        void run(() => {
            return isAlive;
        }, (isStaggered) => {
            unlockScroll();
            scene.finish(isStaggered);
        });

        return () => {
            isAlive = false;
            isMounted.current = false;
            unlockScroll();
            settleOrphanedStage();
        };
    }, []);
};

export { useSequenceLifecycle };
