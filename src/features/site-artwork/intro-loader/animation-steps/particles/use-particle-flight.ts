import { useCallback } from "react";

import {
    MAX_PIXEL_RATIO,
    PARTICLE_FONT_FAMILY,
    PARTICLE_FONT_WEIGHT,
    PARTICLE_SIZE_SCALE,
    PARTICLE_SIZE_SPEEDUP,
} from "../../constants.ts";
import { easeInOutQuad } from "./ease-in-out-quad.ts";
import { useParticlePainter } from "./use-particle-painter.ts";
import { useParticleSampler } from "./use-particle-sampler.ts";

import type { FlightGroup, ParticleGroup } from "../../types.ts";


interface FlightSurface {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
}

type UseParticleFlightReturn = (canvas: HTMLCanvasElement, groups: readonly ParticleGroup[], durationMs: number) => Promise<void>;

const useParticleFlight = (): UseParticleFlightReturn => {
    const sampleGroup = useParticleSampler();
    const paintParticle = useParticlePainter();

    const prepareSurface = useCallback((canvas: HTMLCanvasElement): FlightSurface | null => {
        const pixelRatio = Math.min(MAX_PIXEL_RATIO, window.devicePixelRatio || 1);
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);

        const context = canvas.getContext("2d");
        if (context) {
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            context.textAlign = "center";
            context.textBaseline = "middle";

            return { context, width, height };
        }

        return null;
    }, []);

    const fontOf = useCallback(({ sourceSize, targetSize }: FlightGroup, time: number): string => {
        const growth = easeInOutQuad(Math.min(1, time * PARTICLE_SIZE_SPEEDUP));
        const size = (sourceSize + (targetSize - sourceSize) * growth) * PARTICLE_SIZE_SCALE;
        return `${PARTICLE_FONT_WEIGHT.toString()} ${size.toFixed(1)}px ${PARTICLE_FONT_FAMILY}`;
    }, []);

    const paintFlight = useCallback((context: CanvasRenderingContext2D, flight: FlightGroup, time: number) => {
        context.font = fontOf(flight, time);
        flight.particles.reduce((color, particle) => {
            if (particle.color !== color) {
                context.fillStyle = particle.color;
            }
            paintParticle(context, particle, time);
            return particle.color;
        }, "");
    }, [fontOf, paintParticle]);

    return useCallback((canvas, groups, durationMs) => {
        const surface = prepareSurface(canvas);
        if (!surface) {
            return Promise.resolve();
        }

        const flights = groups.map(sampleGroup);

        return new Promise<void>((resolve) => {
            const startedAt = performance.now();
            const frame = (now: number) => {
                const time = Math.min(1, (now - startedAt) / durationMs);
                surface.context.clearRect(0, 0, surface.width, surface.height);
                flights.forEach((flight) => {
                    paintFlight(surface.context, flight, time);
                });

                if (time < 1) {
                    requestAnimationFrame(frame);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(frame);
        });
    }, [prepareSurface, sampleGroup, paintFlight]);
};

export { useParticleFlight };
export type { UseParticleFlightReturn };
