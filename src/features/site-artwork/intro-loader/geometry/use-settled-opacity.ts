import { useCallback } from "react";

import { RABBIT_FRAME_SELECTOR } from "../constants.ts";


type UseSettledOpacityReturn = (canvas: HTMLCanvasElement | null) => number;

const useSettledOpacity = (): UseSettledOpacityReturn => {
    const ancestorsOf = useCallback((element: HTMLElement | null): HTMLElement[] => {
        const collect = (node: HTMLElement | null): HTMLElement[] => {
            return node ? [node, ...collect(node.parentElement)] : [];
        };
        return collect(element);
    }, []);

    return useCallback((canvas) => {
        const frameParent = canvas?.closest(RABBIT_FRAME_SELECTOR)?.parentElement ?? null;

        return ancestorsOf(frameParent).reduce((opacity, element) => {
            return opacity * (Number(getComputedStyle(element).opacity) || 1);
        }, 1);
    }, [ancestorsOf]);
};

export { useSettledOpacity };
export type { UseSettledOpacityReturn };
