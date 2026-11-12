import { useCallback, useEffect, useMemo } from "react";
import { OrthographicCamera, WebGLRenderTarget } from "three";

import { CAMERA_DISTANCE, CAMERA_FAR, CAMERA_NEAR, RGBA_CHANNELS, SUPERSAMPLE } from "../constants.ts";

import type { AsciiGrid, AsciiTarget } from "../types.ts";


type UseAsciiTargetReturn = AsciiTarget | null;

const useAsciiTarget = (grid: AsciiGrid | null): UseAsciiTargetReturn => {
    const camera = useMemo(() => {
        const orthographic = new OrthographicCamera(-1, 1, 1, -1, CAMERA_NEAR, CAMERA_FAR);
        orthographic.position.set(0, 0, CAMERA_DISTANCE);
        return orthographic;
    }, []);

    const createTarget = useCallback((): AsciiTarget | null => {
        if (!grid) {
            return null;
        }

        const width = grid.columns * SUPERSAMPLE;
        const height = grid.rows * SUPERSAMPLE;

        return {
            camera,
            renderTarget: new WebGLRenderTarget(width, height),
            pixels: new Uint8Array(width * height * RGBA_CHANNELS),
            isFitted: false,
        };
    }, [grid, camera]);

    const target = useMemo(() => {
        return createTarget();
    }, [createTarget]);

    useEffect(() => {
        return () => {
            target?.renderTarget.dispose();
        };
    }, [target]);

    return target;
};

export { useAsciiTarget };
export type { UseAsciiTargetReturn };
