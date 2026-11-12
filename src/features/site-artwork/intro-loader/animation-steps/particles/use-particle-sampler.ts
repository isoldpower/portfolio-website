import { useCallback } from "react";

import {
    CHANNEL_MAX,
    PARTICLE_LEVEL_THRESHOLDS,
    PARTICLE_LUMINANCE_WEIGHTS,
    PARTICLE_MIN_ALPHA,
    PARTICLE_MIN_CELL,
    PARTICLE_MIN_SOURCE_SIZE,
    PARTICLE_MIN_TARGET_SIZE,
    PARTICLE_PALETTE,
    PARTICLE_SEED_RANGE,
    PARTICLE_STAGGER,
    PARTICLE_STAGGER_SWEEP,
    PARTICLE_STEP_ORDERS,
    RGBA_CHANNELS,
} from "../../constants.ts";

import type { FlightGroup, Particle, ParticleGroup } from "../../types.ts";


interface Thumbnail {
    columns: number;
    rows: number;
    pixels: Uint8ClampedArray;
}

interface CellSample {
    u: number;
    v: number;
    level: number;
    cell: number;
}

type UseParticleSamplerReturn = (group: ParticleGroup) => FlightGroup;

const useParticleSampler = (): UseParticleSamplerReturn => {
    const halveToward = useCallback((raster: HTMLCanvasElement, columns: number): HTMLCanvasElement => {
        let current = raster;
        while (current.width / 2 >= columns * 2) {
            const halved = document.createElement("canvas");
            halved.width = Math.ceil(current.width / 2);
            halved.height = Math.ceil(current.height / 2);
            halved.getContext("2d")?.drawImage(current, 0, 0, halved.width, halved.height);
            current = halved;
        }

        return current;
    }, []);

    const thumbnailOf = useCallback(({ raster, step }: ParticleGroup): Thumbnail | null => {
        const columns = Math.max(1, Math.round(raster.width / step));
        const rows = Math.max(1, Math.round(raster.height / step));
        const thumbnail = document.createElement("canvas");
        thumbnail.width = columns;
        thumbnail.height = rows;

        const context = thumbnail.getContext("2d");
        if (!context) {
            return null;
        }

        context.imageSmoothingEnabled = true;
        context.drawImage(halveToward(raster, columns), 0, 0, columns, rows);

        return {
            columns,
            rows,
            pixels: context.getImageData(0, 0, columns, rows).data
        };
    }, [halveToward]);

    const levelAt = useCallback((pixels: Uint8ClampedArray, offset: number): number => {
        const [red, green, blue] = PARTICLE_LUMINANCE_WEIGHTS;
        const luminance = (red * pixels[offset] + green * pixels[offset + 1] + blue * pixels[offset + 2]) / CHANNEL_MAX;
        const level = PARTICLE_LEVEL_THRESHOLDS.findIndex((threshold) => {
            return luminance < threshold;
        });
        return level === -1 ? PARTICLE_LEVEL_THRESHOLDS.length : level;
    }, []);

    const isOutside = useCallback((clip: DOMRect | null, x: number, y: number): boolean => {
        return !!clip && (x < clip.left || x > clip.right || y < clip.top || y > clip.bottom);
    }, []);

    const createParticle = useCallback((group: ParticleGroup, { u, v, level, cell }: CellSample): Particle => {
        const { source, destination } = group;
        const sourceX = source.left + u * source.width;
        const sourceY = source.top + v * source.height;
        const targetX = destination.left + u * destination.width;
        const targetY = destination.top + v * destination.height;
        const stagger = u * PARTICLE_STAGGER_SWEEP + Math.random() * (1 - PARTICLE_STAGGER_SWEEP);

        return {
            sourceX,
            sourceY,
            targetX,
            targetY,
            stepsX: Math.round(Math.abs(targetX - sourceX) / cell),
            stepsY: Math.round(Math.abs(targetY - sourceY) / cell),
            order: PARTICLE_STEP_ORDERS[Math.floor(Math.random() * PARTICLE_STEP_ORDERS.length)],
            delay: group.delay + PARTICLE_STAGGER * stagger,
            seed: Math.floor(Math.random() * PARTICLE_SEED_RANGE),
            level,
            color: PARTICLE_PALETTE[level],
            isClipped: isOutside(group.clip, targetX, targetY),
            targetAlpha: group.targetAlpha,
        };
    }, [isOutside]);

    const sampleParticles = useCallback((group: ParticleGroup, { columns, rows, pixels }: Thumbnail): Particle[] => {
        const cell = Math.max(PARTICLE_MIN_CELL, group.destination.width / columns);
        const columnIndices = Array.from({ length: columns }, (_, index) => {
            return index;
        });
        const rowIndices = Array.from({ length: rows }, (_, index) => {
            return index;
        });

        return rowIndices
            .flatMap((row) => columnIndices.map((column) => {
                const offset = (row * columns + column) * RGBA_CHANNELS;
                if (pixels[offset + 3] < PARTICLE_MIN_ALPHA) {
                    return null;
                }

                return createParticle(group, {
                    u: (column + 0.5) / columns,
                    v: (row + 0.5) / rows,
                    level: levelAt(pixels, offset),
                    cell,
                });
            }))
            .filter((particle): particle is Particle => particle !== null)
            .sort((first, second) => first.level - second.level);
    }, [createParticle, levelAt]);

    return useCallback((group) => {
        const thumbnail = thumbnailOf(group);
        if (!thumbnail) {
            return {
                particles: [],
                sourceSize: PARTICLE_MIN_SOURCE_SIZE,
                targetSize: PARTICLE_MIN_TARGET_SIZE,
            };
        }

        return {
            particles: sampleParticles(group, thumbnail),
            sourceSize: Math.max(PARTICLE_MIN_SOURCE_SIZE, group.source.width / thumbnail.columns),
            targetSize: Math.max(PARTICLE_MIN_TARGET_SIZE, group.destination.width / thumbnail.columns),
        };
    }, [thumbnailOf, sampleParticles]);
};

export { useParticleSampler };
export type { UseParticleSamplerReturn };
