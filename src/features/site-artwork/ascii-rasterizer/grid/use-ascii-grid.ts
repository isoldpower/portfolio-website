import { useCallback, useEffect, useState } from "react";

import { MAX_PIXEL_RATIO, MIN_CELLS } from "../constants.ts";

import type { AsciiGrid } from "../types.ts";
import type { RefObject } from "react";


type UseAsciiGridReturn = AsciiGrid | null;

const useAsciiGrid = (canvas: RefObject<HTMLCanvasElement | null>, cell: number): UseAsciiGridReturn => {
    const [grid, setGrid] = useState<AsciiGrid | null>(null);

    const cellsAlong = useCallback((length: number): number => {
        return Math.max(MIN_CELLS, Math.floor(length / cell));
    }, [cell]);

    const measure = useCallback((host: HTMLElement) => {
        const width = host.clientWidth || 1;
        const height = host.clientHeight || 1;

        setGrid({
            columns: cellsAlong(width),
            rows: cellsAlong(height),
            width,
            height,
            pixelRatio: Math.min(MAX_PIXEL_RATIO, window.devicePixelRatio || 1),
        });
    }, [cellsAlong]);

    useEffect(() => {
        const host = canvas.current?.parentElement;
        if (!host) {
            return;
        }

        measure(host);
        const observer = new ResizeObserver(() => {
            measure(host);
        });
        observer.observe(host);

        return () => {
            observer.disconnect();
        };
    }, [canvas, measure]);

    return grid;
};

export { useAsciiGrid };
export type { UseAsciiGridReturn };
