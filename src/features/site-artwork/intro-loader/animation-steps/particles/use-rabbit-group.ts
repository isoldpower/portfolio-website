import { useCallback } from "react";

import { RABBIT_CELL, RABBIT_FLIGHT_DELAY, RABBIT_MIN_PARTICLE_STEP } from "../../constants.ts";
import { useSettledOpacity } from "../../geometry/use-settled-opacity.ts";

import type { ParticleGroup, RabbitSnapshot } from "../../types.ts";


type UseRabbitGroupReturn = (
    shot: RabbitSnapshot | null,
    image: HTMLImageElement | null,
    rabbitCanvas: HTMLCanvasElement | null
) => ParticleGroup | null;

const useRabbitGroup = (): UseRabbitGroupReturn => {
    const settledOpacity = useSettledOpacity();

    const rasterImage = useCallback((image: HTMLImageElement): HTMLCanvasElement => {
        const raster = document.createElement("canvas");
        raster.width = image.naturalWidth;
        raster.height = image.naturalHeight;
        raster.getContext("2d")?.drawImage(image, 0, 0);

        return raster;
    }, []);

    const viewportClip = useCallback((rect: DOMRect): DOMRect => {
        const left = Math.max(rect.left, 0);
        const top = Math.max(rect.top, 0);
        const right = Math.min(rect.right, window.innerWidth);
        const bottom = Math.min(rect.bottom, window.innerHeight);

        return new DOMRect(left, top, right - left, bottom - top);
    }, []);

    return useCallback((shot, image, rabbitCanvas) => {
        if (!shot || !image) {
            return null;
        }

        const rasterizedElement = rasterImage(image);

        return {
            raster: rasterizedElement,
            step: Math.max(
                RABBIT_MIN_PARTICLE_STEP,
                Math.round((RABBIT_CELL * rasterizedElement.width) / shot.rect.width)
            ),
            source: image.getBoundingClientRect(),
            destination: shot.rect,
            delay: RABBIT_FLIGHT_DELAY,
            clip: viewportClip(shot.rect),
            targetAlpha: settledOpacity(rabbitCanvas),
        };
    }, [rasterImage, viewportClip, settledOpacity]);
};

export { useRabbitGroup };
export type { UseRabbitGroupReturn };
