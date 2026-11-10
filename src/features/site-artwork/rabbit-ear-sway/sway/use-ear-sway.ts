import { useCallback } from "react";
import { useFrame } from "@react-three/fiber";

import { usePrefersReducedMotion } from "@shared/lib/hooks";

import { ENERGY_AMPLITUDE, ENERGY_SPEED, IDLE_AMPLITUDE, MAX_FRAME_DELTA } from "../constants.ts";
import { useEarSprings } from "./use-ear-springs.ts";
import { usePointerEnergy } from "./use-pointer-energy.ts";

import type { SwayDrive } from "../types.ts";
import type { ShaderMaterial } from "three";


interface UseEarSwayParams {
    material: ShaderMaterial;
    amountDegrees: number;
}

const useEarSway = ({
    material,
    amountDegrees
}: UseEarSwayParams): void => {
    const isReducedMotion = usePrefersReducedMotion();
    const isEnabled = !isReducedMotion && amountDegrees > 0;
    const decayEnergy = usePointerEnergy(isEnabled);
    const stepEars = useEarSprings(material);

    const createDrive = useCallback((frameDelta: number): SwayDrive => {
        const delta = Math.min(MAX_FRAME_DELTA, frameDelta);
        const energy = decayEnergy(delta);

        return {
            delta,
            amplitude: ((amountDegrees * Math.PI) / 180) * (IDLE_AMPLITUDE + ENERGY_AMPLITUDE * energy),
            speed: 1 + ENERGY_SPEED * energy,
        };
    }, [amountDegrees, decayEnergy]);

    useFrame((_, frameDelta) => {
        if (isEnabled) {
            stepEars(createDrive(frameDelta));
        }
    });
};

export { useEarSway };
export type { UseEarSwayParams };
