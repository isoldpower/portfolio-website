import gsap from "gsap";
import { useCallback } from "react";

import { PIXEL_GRID, REVEAL_MARKERS, SINK_DISTANCE } from "../constants.ts";


type UseParallaxDriftReturn = () => void;

const useParallaxDrift = (): UseParallaxDriftReturn => {
    const snapToGrid = useCallback((value: number) => {
        return Math.round(value / PIXEL_GRID) * PIXEL_GRID;
    }, []);

    const driftEffectCallback = useCallback((
        element: HTMLElement,
        distance: number
    ) => {
        gsap.fromTo(element, { y: 0 }, {
            y: distance,
            ease: "none",
            modifiers: { y: gsap.utils.unitize(snapToGrid) },
            scrollTrigger: {
                trigger: element.parentElement ?? element,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    const addDrift = useCallback((marker: string, distance: number) => {
        gsap.utils.toArray<HTMLElement>(`.${marker}`).forEach((element) => {
            driftEffectCallback(element, distance);
        });
    }, [snapToGrid]);

    return useCallback(() => {
        addDrift(REVEAL_MARKERS.sink, SINK_DISTANCE);
    }, [addDrift]);
};

export { useParallaxDrift };
export type { UseParallaxDriftReturn };
