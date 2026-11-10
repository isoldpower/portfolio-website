import { useFrame, useThree } from "@react-three/fiber";

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
}

const useAsciiFrame = ({
    canvas,
    grid,
    target,
    palette,
    cell,
    glyphs
}: UseAsciiFrameParams): void => {
    const { scene } = useThree();
    const fitCamera = useCameraFit();
    const isVisible = useCanvasVisibility(canvas);
    const layout = useAsciiLayout(grid, cell);
    const throttle = useFrameThrottle(grid);
    const renderSamples = useSampleRender();
    const paintGlyphs = useGlyphPainter({ palette, glyphs });

    useCanvasResolution(canvas, grid);

    useFrame((_, delta) => {
        throttle.tick(delta);

        const context = canvas.current?.getContext("2d");
        if (!context || !grid || !target || !layout) {
            return;
        }
        if (!palette.isReady || !isVisible.current || !throttle.isDue()) {
            return;
        }
        if (!target.isFitted && !fitCamera(scene, grid, target)) {
            return;
        }

        renderSamples(grid, target);
        paintGlyphs(context, grid, target.pixels, layout);
        throttle.markDrawn();
    }, RASTER_PRIORITY);
};

export { useAsciiFrame };
export type { UseAsciiFrameParams };
