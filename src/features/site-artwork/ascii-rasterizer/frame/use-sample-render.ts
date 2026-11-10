import { useCallback } from "react";
import { useThree } from "@react-three/fiber";

import { SUPERSAMPLE } from "../constants.ts";

import type { AsciiGrid, AsciiTarget } from "../types.ts";


type UseSampleRenderReturn = (grid: AsciiGrid, target: AsciiTarget) => void;

const useSampleRender = (): UseSampleRenderReturn => {
    const { gl, scene } = useThree();

    return useCallback(({ columns, rows }, { renderTarget, camera, pixels }) => {
        gl.setRenderTarget(renderTarget);
        gl.render(scene, camera);
        gl.readRenderTargetPixels(renderTarget, 0, 0, columns * SUPERSAMPLE, rows * SUPERSAMPLE, pixels);
        gl.setRenderTarget(null);
    }, [gl, scene]);
};

export { useSampleRender };
export type { UseSampleRenderReturn };
