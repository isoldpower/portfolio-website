import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

import { RASTER_PRIORITY } from "../constants.ts";
import { useCanvasResolution } from "../canvas/use-canvas-resolution.ts";
import { useCanvasVisibility } from "../canvas/use-canvas-visibility.ts";
import { useAsciiLayout } from "../grid/use-ascii-layout.ts";
import { useCameraFit } from "../target/use-camera-fit.ts";
import { useFrameThrottle } from "./use-frame-throttle.ts";
import { useGlyphPainter } from "./use-glyph-painter.ts";
import { useSampleRender } from "./use-sample-render.ts";

import type { AsciiGrid, AsciiPalette, AsciiTarget } from "../types.ts";
import type { RefObject } from "react";


interface UseAsciiFrameParams {
    canvas: RefObject<HTMLCanvasElement | null>;
    grid: AsciiGrid | null;
    target: AsciiTarget | null;
    palette: AsciiPalette;
    cell: number;
    glyphs: string;
    onDraw: (canvas: HTMLCanvasElement) => void;
}

const useAsciiFrame = ({
    canvas,
    grid,
    target,
    palette,
    cell,
    glyphs,
    onDraw
}: UseAsciiFrameParams): void => {
    const { scene } = useThree();
    const fitCamera = useCameraFit();
    const isVisible = useCanvasVisibility(canvas);
    const layout = useAsciiLayout(grid, cell);
    const throttle = useFrameThrottle(grid);
    const renderSamples = useSampleRender();
    const paintGlyphs = useGlyphPainter({ palette, glyphs });
    const hasDrawn = useRef(false);

    useCanvasResolution(canvas, grid);

    useFrame((_, delta) => {
        throttle.tick(delta);
        const context = canvas.current?.getContext("2d");
        if (!context || !grid || !target || !layout) {
            return;
        }

        const isFrameDue = palette.isReady && throttle.isDue();
        const isPaintAllowed = !hasDrawn.current || isVisible.current;
        if (isFrameDue && isPaintAllowed) {
            const isCameraFitted = target.isFitted || fitCamera(scene, grid, target);
            if (isCameraFitted) {
                renderSamples(grid, target);
                paintGlyphs(context, grid, target.pixels, layout);
                throttle.markDrawn();

                hasDrawn.current = true;
                onDraw(context.canvas);
            }
        }
    }, RASTER_PRIORITY);
};

export { useAsciiFrame };
export type { UseAsciiFrameParams };
