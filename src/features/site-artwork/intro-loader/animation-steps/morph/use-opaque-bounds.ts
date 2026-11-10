import { useCallback } from "react";

import { RGBA_CHANNELS, SNAPSHOT_ALPHA_THRESHOLD, SNAPSHOT_CROP_PADDING, SNAPSHOT_SCAN_STEP } from "../../constants.ts";

import type { PixelBounds } from "../../types.ts";


type UseOpaqueBoundsReturn = (canvas: HTMLCanvasElement) => PixelBounds | null;

const useOpaqueBounds = (): UseOpaqueBoundsReturn => {
    const scanAxis = useCallback((length: number): number[] => {
        return Array.from({ length: Math.ceil(length / SNAPSHOT_SCAN_STEP) }, (_, index) => {
            return index * SNAPSHOT_SCAN_STEP;
        });
    }, []);

    const pad = useCallback(({ left, top, right, bottom }: PixelBounds, width: number, height: number): PixelBounds => {
        return {
            left: Math.max(0, left - SNAPSHOT_CROP_PADDING),
            top: Math.max(0, top - SNAPSHOT_CROP_PADDING),
            right: Math.min(width - 1, right + SNAPSHOT_CROP_PADDING),
            bottom: Math.min(height - 1, bottom + SNAPSHOT_CROP_PADDING),
        };
    }, []);

    return useCallback((canvas) => {
        const context = canvas.getContext("2d");
        if (!context) {
            return null;
        }

        const { width, height } = canvas;
        const pixels = context.getImageData(0, 0, width, height).data;
        const columns = scanAxis(width);
        const empty: PixelBounds = { left: width, top: height, right: -1, bottom: -1 };

        const bounds = scanAxis(height).reduce((found, y) => {
            return columns.reduce((current, x) => {
                if (pixels[(y * width + x) * RGBA_CHANNELS + 3] <= SNAPSHOT_ALPHA_THRESHOLD) {
                    return current;
                }

                current.left = Math.min(current.left, x);
                current.right = Math.max(current.right, x);
                current.top = Math.min(current.top, y);
                current.bottom = Math.max(current.bottom, y);
                return current;
            }, found);
        }, empty);

        return bounds.right < 0 ? null : pad(bounds, width, height);
    }, [scanAxis, pad]);
};

export { useOpaqueBounds };
export type { UseOpaqueBoundsReturn };
