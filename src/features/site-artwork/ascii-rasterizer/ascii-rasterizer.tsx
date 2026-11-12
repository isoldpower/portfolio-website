import { useAsciiFrame } from "./frame/use-ascii-frame.ts";
import { useAsciiGrid } from "./grid/use-ascii-grid.ts";
import { useAsciiPalette } from "./palette/use-ascii-palette.ts";
import { useAsciiTarget } from "./target/use-ascii-target.ts";

import type { CellArranger } from "@shared/lib/types";
import type { RefObject } from "react";


interface AsciiRasterizerProps {
    canvas: RefObject<HTMLCanvasElement | null>;
    cell: number;
    glyphs: string;
    onDraw: (canvas: HTMLCanvasElement) => void;
    arrange?: CellArranger;
}

function AsciiRasterizer({
    canvas,
    cell,
    glyphs,
    onDraw,
    arrange
}: AsciiRasterizerProps) {
    const grid = useAsciiGrid(canvas, cell);
    const palette = useAsciiPalette(cell);
    const target = useAsciiTarget(grid);

    useAsciiFrame({ canvas, grid, target, palette, cell, glyphs, onDraw, arrange });

    return null;
}

export { AsciiRasterizer };
export type { AsciiRasterizerProps };
