import { useCallback, useEffect, useRef } from "react";

import {
    MAX_PIXEL_RATIO,
    RING_DIM_ALPHA,
    RING_DRAW_RATE,
    RING_FALLBACK_GLYPH,
    RING_FONT,
    RING_FONT_SCALE,
    RING_MIN_POINTS,
    RING_RADIUS,
    RING_STEP_MS,
    RING_TAIL,
    RING_TOKENS
} from "../constants.ts";

import type { RefObject } from "react";


interface UseRingLoaderParams {
    canvas: RefObject<HTMLCanvasElement | null>;
    cell: number;
    glyphs: string;
    isEnabled: boolean;
}

type UseRingLoaderReturn = () => void;

interface RingFrame {
    context: CanvasRenderingContext2D;
    colors: readonly string[];
    width: number;
    height: number;
}

const HEAD_LEVEL = 2;
const TAIL_LEVEL = 1;
const DIM_LEVEL = 0;

const useRingLoader = ({ canvas, cell, glyphs, isEnabled }: UseRingLoaderParams): UseRingLoaderReturn => {
    const animationFrameId = useRef<number | undefined>(undefined);
    const isRingStopped = useRef(false);

    const cancelRingFrame = useCallback(() => {
        if (animationFrameId.current !== undefined) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = undefined;
        }
    }, []);

    const stopRing = useCallback(() => {
        isRingStopped.current = true;
        cancelRingFrame();
    }, [cancelRingFrame]);

    const fitCanvas = useCallback((canvasElement: HTMLCanvasElement, { context, width, height }: RingFrame) => {
        const pixelRatio = Math.min(MAX_PIXEL_RATIO, window.devicePixelRatio || 1);
        const backingWidth = Math.round(width * pixelRatio);
        const backingHeight = Math.round(height * pixelRatio);
        if (canvasElement.width === backingWidth && canvasElement.height === backingHeight) {
            return;
        }

        canvasElement.width = backingWidth;
        canvasElement.height = backingHeight;
        canvasElement.style.width = `${String(width)}px`;
        canvasElement.style.height = `${String(height)}px`;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }, []);

    const snapToGrid = useCallback((position: number, length: number): number => {
        const columnCount = Math.floor(length / cell);
        const gridOrigin = length - columnCount * cell + cell / 2;

        return gridOrigin + Math.round((position - gridOrigin) / cell) * cell;
    }, [cell]);

    const glyphLevelOf = useCallback((stepsBehindHead: number): number => {
        if (stepsBehindHead === 0) {
            return HEAD_LEVEL;
        }

        return stepsBehindHead < RING_TAIL ? TAIL_LEVEL : DIM_LEVEL;
    }, []);

    const paintRing = useCallback(({ context, colors, width, height }: RingFrame, step: number) => {
        const ringRadius = Math.min(width, height) * RING_RADIUS;
        const pointCount = Math.max(RING_MIN_POINTS, Math.round((2 * Math.PI * ringRadius) / cell));
        const visiblePointCount = Math.min(pointCount, (step + 1) * RING_DRAW_RATE);
        const isRingComplete = visiblePointCount >= pointCount;
        const headIndex = (isRingComplete ? step : visiblePointCount - 1) % pointCount;
        const fontSize = String(Math.round(cell * RING_FONT_SCALE));

        context.clearRect(0, 0, width, height);
        context.font = RING_FONT.replace("{size}", fontSize);
        context.textAlign = "center";
        context.textBaseline = "middle";

        Array.from({ length: visiblePointCount }, (_, pointIndex) => {
            const angle = -Math.PI / 2 + (pointIndex / pointCount) * Math.PI * 2;
            const glyphLevel = glyphLevelOf((headIndex - pointIndex + pointCount) % pointCount);

            context.globalAlpha = glyphLevel === DIM_LEVEL ? RING_DIM_ALPHA : 1;
            context.fillStyle = colors[glyphLevel] ?? "";
            context.fillText(
                glyphs[glyphLevel] ?? RING_FALLBACK_GLYPH,
                snapToGrid(width / 2 + Math.cos(angle) * ringRadius, width),
                snapToGrid(height / 2 + Math.sin(angle) * ringRadius, height)
            );
        });
        context.globalAlpha = 1;
    }, [cell, glyphs, snapToGrid, glyphLevelOf]);

    useEffect(() => {
        const canvasElement = canvas.current;
        const hostElement = canvasElement?.parentElement;
        const context = canvasElement?.getContext("2d");
        if (!isEnabled || isRingStopped.current || !canvasElement || !hostElement || !context) {
            return;
        }

        const rootStyles = getComputedStyle(document.documentElement);
        const colors = RING_TOKENS.map((colorToken) => {
            return rootStyles.getPropertyValue(colorToken).trim();
        });
        const startedAt = performance.now();
        let lastPaintedStep = -1;

        const drawRingFrame = (now: number) => {
            const ringFrame: RingFrame = {
                context,
                colors,
                width: hostElement.clientWidth || 1,
                height: hostElement.clientHeight || 1,
            };
            const step = Math.floor((now - startedAt) / RING_STEP_MS);

            fitCanvas(canvasElement, ringFrame);
            if (step !== lastPaintedStep) {
                lastPaintedStep = step;
                paintRing(ringFrame, step);
            }
            animationFrameId.current = requestAnimationFrame(drawRingFrame);
        };

        animationFrameId.current = requestAnimationFrame(drawRingFrame);

        return cancelRingFrame;
    }, [canvas, isEnabled, fitCanvas, paintRing, cancelRingFrame]);

    return stopRing;
};

export { useRingLoader };
export type { UseRingLoaderParams, UseRingLoaderReturn };
