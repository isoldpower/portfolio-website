import { useCallback, useRef } from "react";

import {
    EAR_RHYTHMS,
    PRIMARY_WAVE_WEIGHT,
    SECONDARY_WAVE_RATE,
    SECONDARY_WAVE_WEIGHT,
    TILT_WAVE_RATE,
    TILT_WAVE_WEIGHT,
} from "../constants.ts";

import type { EarRhythm, EarState, SpringAxis, SwayDrive } from "../types.ts";
import type { ShaderMaterial, Vector2 } from "three";


type UseEarSpringsReturn = (drive: SwayDrive) => void;

const useEarSprings = (material: ShaderMaterial): UseEarSpringsReturn => {
    const ears = useRef<EarState[]>(EAR_RHYTHMS.map((rhythm) => {
        return {
            rhythm,
            phase: rhythm.initialPhase,
            axes: [{ angle: 0, velocity: 0 }, { angle: 0, velocity: 0 }],
        };
    }));

    const swayTargets = useCallback(({ shiftX, shiftY }: EarRhythm, phase: number, amplitude: number): number[] => {
        const swing = PRIMARY_WAVE_WEIGHT * Math.sin(phase + shiftX)
            + SECONDARY_WAVE_WEIGHT * Math.sin(phase * SECONDARY_WAVE_RATE + shiftY);
        const tilt = TILT_WAVE_WEIGHT * Math.sin(phase * TILT_WAVE_RATE + shiftY);

        return [amplitude * swing, amplitude * tilt];
    }, []);

    const stepSpring = useCallback(({ angle, velocity }: SpringAxis, target: number, { stiffness, damping }: EarRhythm, delta: number): SpringAxis => {
        const nextVelocity = (velocity + (target - angle) * stiffness * delta) * Math.exp(-damping * delta);
        return { angle: angle + nextVelocity * delta, velocity: nextVelocity };
    }, []);

    const stepEar = useCallback(({ rhythm, phase, axes }: EarState, { delta, amplitude, speed }: SwayDrive): EarState => {
        const nextPhase = phase + delta * Math.PI * 2 * rhythm.frequency * speed;
        const targets = swayTargets(rhythm, nextPhase, amplitude);
        const nextAxes = axes.map((axis, index) => {
            return stepSpring(axis, targets[index], rhythm, delta);
        });

        return { rhythm, phase: nextPhase, axes: nextAxes };
    }, [swayTargets, stepSpring]);

    const applyEar = useCallback(({ rhythm, axes }: EarState) => {
        (material.uniforms[rhythm.uniform].value as Vector2).set(axes[0].angle, axes[1].angle);
    }, [material]);

    return useCallback((drive: SwayDrive) => {
        ears.current = ears.current.map((ear) => {
            return stepEar(ear, drive);
        });

        ears.current.forEach(applyEar);
    }, [stepEar, applyEar]);
};

export { useEarSprings };
export type { UseEarSpringsReturn };
