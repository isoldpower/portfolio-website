import { useCallback, useRef } from "react";

import {
    COVERAGE_GAMMA,
    COVERAGE_RANGE,
    FALLBACK_GLYPH,
    MIN_COVERAGE,
    SAMPLES_PER_CELL,
    SHADE_THRESHOLDS,
} from "../constants.ts";
import { useCellSampler } from "./use-cell-sampler.ts";

import type { AsciiCell, AsciiGrid, AsciiLayout, AsciiPalette, CellSample } from "../types.ts";
import type { CellArranger, CellPlacement } from "@shared/lib/types";


interface UseGlyphPainterParams {
    palette: AsciiPalette;
    glyphs: string;
    arrange?: CellArranger;
}

type UseGlyphPainterReturn = (
    context: CanvasRenderingContext2D,
    grid: AsciiGrid,
    pixels: Uint8Array,
    layout: AsciiLayout
) => void;

const useGlyphPainter = ({ palette, glyphs, arrange }: UseGlyphPainterParams): UseGlyphPainterReturn => {
    const sampleCell = useCellSampler();
    const glyphPlacementRef = useRef<CellPlacement>({ x: 0, y: 0 });

    const shadeLevel = useCallback((shade: number): number => {
        const level = SHADE_THRESHOLDS.findIndex((threshold) => {
            return shade < threshold;
        });
        return level === -1 ? SHADE_THRESHOLDS.length : level;
    }, []);

    const glyphOpacity = useCallback((filled: number): number => {
        return Math.pow(
            Math.min(1, (filled - MIN_COVERAGE) / COVERAGE_RANGE),
            COVERAGE_GAMMA
        );
    }, []);

    const paintCell = useCallback((
        context: CanvasRenderingContext2D,
        grid: AsciiGrid,
        cell: AsciiCell,
        { coverage, luminance }: CellSample
    ) => {
        const filled = coverage / SAMPLES_PER_CELL;
        if (filled < MIN_COVERAGE) {
            return;
        }

        const level = shadeLevel(luminance / coverage);
        context.globalAlpha = glyphOpacity(filled);
        context.fillStyle = palette.colors[level];
        const glyphPlacement = glyphPlacementRef.current;
        glyphPlacement.x = cell.x;
        glyphPlacement.y = cell.y;
        arrange?.(cell.x, cell.y, grid.width, grid.height, glyphPlacement);
        context.fillText(glyphs[level] ?? FALLBACK_GLYPH, glyphPlacement.x, glyphPlacement.y);
    }, [palette, glyphs, arrange, shadeLevel, glyphOpacity]);

    const prepareContext = useCallback((context: CanvasRenderingContext2D, { width, height }: AsciiGrid) => {
        context.clearRect(0, 0, width, height);
        context.font = palette.font;
        context.textAlign = "center";
        context.textBaseline = "middle";
    }, [palette]);

    return useCallback((context, grid, pixels, { cells, sampleOffsets }) => {
        prepareContext(context, grid);
        cells.forEach((cell) => {
            paintCell(context, grid, cell, sampleCell(pixels, cell, sampleOffsets));
        });

        context.globalAlpha = 1;
    }, [prepareContext, paintCell, sampleCell]);
};

export { useGlyphPainter };
export type { UseGlyphPainterParams, UseGlyphPainterReturn };
