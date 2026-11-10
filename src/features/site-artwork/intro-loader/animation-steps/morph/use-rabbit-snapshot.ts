import { useCallback } from "react";

import { useOpaqueBounds } from "./use-opaque-bounds.ts";

import type { PixelBounds, RabbitSnapshot } from "../../types.ts";


type UseRabbitSnapshotReturn = (canvas: HTMLCanvasElement) => RabbitSnapshot | null;

const useRabbitSnapshot = (): UseRabbitSnapshotReturn => {
    const findBounds = useOpaqueBounds();

    const crop = useCallback((canvas: HTMLCanvasElement, { left, top, right, bottom }: PixelBounds): HTMLCanvasElement => {
        const cropped = document.createElement("canvas");
        cropped.width = right - left + 1;
        cropped.height = bottom - top + 1;
        cropped.getContext("2d")?.drawImage(canvas, left, top, cropped.width, cropped.height, 0, 0, cropped.width, cropped.height);
        return cropped;
    }, []);

    const screenRect = useCallback((canvas: HTMLCanvasElement, bounds: PixelBounds, cropped: HTMLCanvasElement): DOMRect => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return new DOMRect(
            rect.left + bounds.left / scaleX,
            rect.top + bounds.top / scaleY,
            cropped.width / scaleX,
            cropped.height / scaleY
        );
    }, []);

    return useCallback((canvas) => {
        try {
            const bounds = findBounds(canvas);
            if (!bounds) {
                return null;
            }

            const cropped = crop(canvas, bounds);
            return {
                src: cropped.toDataURL(),
                rect: screenRect(canvas, bounds, cropped),
                filter: getComputedStyle(canvas).filter,
            };
        } catch {
            return null;
        }
    }, [findBounds, crop, screenRect]);
};

export { useRabbitSnapshot };
export type { UseRabbitSnapshotReturn };
