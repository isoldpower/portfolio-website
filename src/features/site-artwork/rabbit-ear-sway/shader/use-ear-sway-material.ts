import { useEffect, useMemo } from "react";
import { ShaderMaterial, Vector2, Vector3 } from "three";

import { LIGHT_DIRECTION } from "../constants.ts";
import { EAR_BEND_FRAGMENT_SHADER, EAR_BEND_VERTEX_SHADER } from "./ear-bend-shader.ts";


type UseEarSwayMaterialReturn = ShaderMaterial;

const useEarSwayMaterial = (): UseEarSwayMaterialReturn => {
    const material = useMemo(() => {
        return new ShaderMaterial({
            uniforms: {
                lightDirection: { value: new Vector3(...LIGHT_DIRECTION).normalize() },
                earA: { value: new Vector2() },
                earB: { value: new Vector2() },
            },
            vertexShader: EAR_BEND_VERTEX_SHADER,
            fragmentShader: EAR_BEND_FRAGMENT_SHADER,
        });
    }, []);

    useEffect(() => {
        return () => {
            material.dispose();
        };
    }, [material]);

    return material;
};

export { useEarSwayMaterial };
export type { UseEarSwayMaterialReturn };
