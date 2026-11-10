import { useCallback } from "react";

import {
    BAYER_LEVELS,
    BAYER_MATRIX,
    BAYER_SIZE,
    DITHER_CELL,
    RESIZE_DEBOUNCE_MS,
    RGBA_CHANNELS,
    VIGNETTE_CENTER,
    VIGNETTE_FALLOFF,
    VIGNETTE_HORIZONTAL_SQUASH,
    VIGNETTE_INNER_RADIUS,
    VIGNETTE_RGBA,
    VIGNETTE_STRENGTH,
} from "./constants.ts";

import type { RefCallback } from "react";


type UseDitherVignetteReturn = RefCallback<HTMLCanvasElement>;

interface DitherGrid {
    width: number;
    height: number;
}

interface DitherCell {
    row: number;
    column: number;
}

const useDitherVignette = (): UseDitherVignetteReturn => {
    const measureGrid = useCallback((): DitherGrid => {
        return {
            width: Math.ceil(window.innerWidth / DITHER_CELL),
            height: Math.ceil(window.innerHeight / DITHER_CELL),
        };
    }, []);

    const shadeStrength = useCallback(({ row, column }: DitherCell, { width, height }: DitherGrid): number => {
        const dx = (column / width - VIGNETTE_CENTER.x) * 2;
        const dy = (row / height - VIGNETTE_CENTER.y) * 2;
        const radius = Math.sqrt(dx * dx * VIGNETTE_HORIZONTAL_SQUASH + dy * dy);
        const falloff = (radius - VIGNETTE_INNER_RADIUS) / VIGNETTE_FALLOFF;

        return Math.min(1, Math.max(0, falloff)) * VIGNETTE_STRENGTH;
    }, []);

    const ditherThreshold = useCallback(({ row, column }: DitherCell): number => {
        const level = BAYER_MATRIX[(row % BAYER_SIZE) * BAYER_SIZE + (column % BAYER_SIZE)];
        return (level + 0.5) / BAYER_LEVELS;
    }, []);

    const collectShadedOffsets = useCallback((grid: DitherGrid): number[] => {
        const rows = Array.from({ length: grid.height }, (_, index) => {
            return index;
        });
        const columns = Array.from({ length: grid.width }, (_, index) => {
            return index;
        });

        return rows
            .flatMap((row) => {
                return columns.map((column) => {
                    const cell = { row, column };
                    const isShaded = shadeStrength(cell, grid) > ditherThreshold(cell);
                    return isShaded ? (row * grid.width + column) * RGBA_CHANNELS : null;
                });
            })
            .filter((offset): offset is number => {
                return offset !== null;
            });
    }, [shadeStrength, ditherThreshold]);

    const paintVignette = useCallback((canvas: HTMLCanvasElement) => {
        const grid = measureGrid();
        canvas.width = grid.width;
        canvas.height = grid.height;

        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }

        const image = context.createImageData(grid.width, grid.height);
        collectShadedOffsets(grid).forEach((offset) => {
            image.data.set(VIGNETTE_RGBA, offset);
        });

        context.putImageData(image, 0, 0);
    }, [measureGrid, collectShadedOffsets]);

    const subscribeToResize = useCallback((canvas: HTMLCanvasElement) => {
        let timer: ReturnType<typeof setTimeout> | undefined;

        const handleResize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                paintVignette(canvas);
            }, RESIZE_DEBOUNCE_MS);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timer);
        };
    }, [paintVignette]);

    return useCallback((canvas: HTMLCanvasElement | null) => {
        if (!canvas) {
            return;
        }

        paintVignette(canvas);
        return subscribeToResize(canvas);
    }, [paintVignette, subscribeToResize]);
};

export { useDitherVignette };
export type { UseDitherVignetteReturn };
