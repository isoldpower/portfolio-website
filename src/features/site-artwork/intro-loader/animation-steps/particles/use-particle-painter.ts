import { useCallback } from "react";
import {
    PARTICLE_GLYPH_STRIDE,
    PARTICLE_REST_GLYPHS,
    PARTICLE_TRAVEL_GLYPHS,
    PARTICLE_TRAVEL_SHARE,
} from "../../constants.ts";
import { easeInOutQuad } from "./ease-in-out-quad.ts";

import type { Particle } from "../../types.ts";


type UseParticlePainterReturn = (context: CanvasRenderingContext2D, particle: Particle, time: number) => void;

const useParticlePainter = (): UseParticlePainterReturn => {
    const splitSteps = useCallback(({ order, stepsX, stepsY }: Particle, taken: number): [number, number] => {
        switch (order) {
            case "horizontal-first": {
                const takenX = Math.min(taken, stepsX);
                return [takenX, taken - takenX];
            }
            case "vertical-first": {
                const takenY = Math.min(taken, stepsY);
                return [taken - takenY, takenY];
            }
            case "diagonal": {
                const total = stepsX + stepsY;
                const takenX = total ? Math.floor((taken * stepsX) / total) : 0;
                return [takenX, taken - takenX];
            }
        }
    }, []);

    const travelledShare = useCallback((taken: number, steps: number, progress: number): number => {
        if (steps) {
            return taken / steps;
        }
        return progress >= 1 ? 1 : 0;
    }, []);

    const glyphOf = useCallback(({ level, seed }: Particle, progress: number, taken: number): string => {
        if (progress <= 0 || progress >= 1) {
            return PARTICLE_REST_GLYPHS[level];
        }
        return PARTICLE_TRAVEL_GLYPHS[(seed + taken * PARTICLE_GLYPH_STRIDE) % PARTICLE_TRAVEL_GLYPHS.length];
    }, []);

    const alphaOf = useCallback(({ targetAlpha, isClipped }: Particle, progress: number): number => {
        const settleAlpha = 1 + (targetAlpha - 1) * progress;
        return isClipped ? settleAlpha * (1 - progress) : settleAlpha;
    }, []);

    return useCallback((context, particle, time) => {
        const progress = Math.min(1, Math.max(0, (time - particle.delay) / PARTICLE_TRAVEL_SHARE));
        const taken = Math.floor(easeInOutQuad(progress) * (particle.stepsX + particle.stepsY));
        const [takenX, takenY] = splitSteps(particle, taken);
        const positionX = particle.sourceX + (particle.targetX - particle.sourceX) * travelledShare(takenX, particle.stepsX, progress);
        const positionY = particle.sourceY + (particle.targetY - particle.sourceY) * travelledShare(takenY, particle.stepsY, progress);

        context.globalAlpha = alphaOf(particle, progress);
        context.fillText(glyphOf(particle, progress, taken), positionX, positionY);
        context.globalAlpha = 1;
    }, [splitSteps, travelledShare, glyphOf, alphaOf]);
};

export { useParticlePainter };
export type { UseParticlePainterReturn };
