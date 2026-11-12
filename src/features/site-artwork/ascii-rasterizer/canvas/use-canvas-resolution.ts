import { useEffect } from "react";

import type { AsciiGrid } from "../types.ts";
import type { RefObject } from "react";


const useCanvasResolution = (canvas: RefObject<HTMLCanvasElement | null>, grid: AsciiGrid | null): void => {
    useEffect(() => {
        const element = canvas.current;
        if (!element || !grid) {
            return;
        }

        const { width, height, pixelRatio } = grid;

        element.width = Math.round(width * pixelRatio);
        element.height = Math.round(height * pixelRatio);
        element.style.width = `${width.toString()}px`;
        element.style.height = `${height.toString()}px`;
        element.getContext("2d")?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }, [canvas, grid]);
};

export { useCanvasResolution };
