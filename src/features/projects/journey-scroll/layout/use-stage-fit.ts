import { useCallback, useEffect } from "react";

import { HEADER_OFFSET, MIN_STAGE_FIT, STAGE_HEIGHT } from "../constants.ts";

import type { RefObject } from "react";


const useStageFit = (stageRef: RefObject<HTMLElement | null>): void => {
    const viewportFitScale = useCallback((): number => {
        return Math.min(
            1,
            Math.max(MIN_STAGE_FIT, (window.innerHeight - HEADER_OFFSET) / STAGE_HEIGHT)
        );
    }, []);

    useEffect(() => {
        const frameElement = stageRef.current?.querySelector<HTMLElement>('[data-journey="frame"]');
        if (!frameElement) {
            return undefined;
        }

        const applyFitScale = () => {
            frameElement.style.setProperty("--journey-fit", String(viewportFitScale()));
        };

        applyFitScale();
        window.addEventListener("resize", applyFitScale);

        return () => {
            window.removeEventListener("resize", applyFitScale);
        };
    }, [stageRef, viewportFitScale]);
};

export { useStageFit };
