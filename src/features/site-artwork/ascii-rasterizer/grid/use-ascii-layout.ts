import { useCallback, useMemo } from "react";

import { RGBA_CHANNELS, SUPERSAMPLE, SUPERSAMPLE_AXIS } from "../constants.ts";

import type { AsciiCell, AsciiGrid, AsciiLayout } from "../types.ts";


type UseAsciiLayoutReturn = AsciiLayout | null;

const useAsciiLayout = (grid: AsciiGrid | null, cell: number): UseAsciiLayoutReturn => {
    const createSampleOffsets = useCallback((sampleWidth: number): number[] => {
        return SUPERSAMPLE_AXIS.flatMap((sampleRow) => {
            return SUPERSAMPLE_AXIS.map((sampleColumn) => {
                return (sampleRow * sampleWidth + sampleColumn) * RGBA_CHANNELS;
            });
        });
    }, []);

    const createCells = useCallback(({ columns, rows, width, height }: AsciiGrid): AsciiCell[] => {
        const sampleWidth = columns * SUPERSAMPLE;
        const originX = width - columns * cell + cell / 2;
        const originY = (height - rows * cell) / 2 + cell / 2;
        const columnIndices = Array.from({ length: columns }, (_, index) => {
            return index;
        });
        const rowIndices = Array.from({ length: rows }, (_, index) => {
            return index;
        });

        return rowIndices.flatMap((row) => {
            const flippedRow = rows - 1 - row;

            return columnIndices.map((column) => ({
                x: originX + column * cell,
                y: originY + row * cell,
                offset: (flippedRow * SUPERSAMPLE * sampleWidth + column * SUPERSAMPLE) * RGBA_CHANNELS,
            }));
        });
    }, [cell]);

    const createLayout = useCallback((): AsciiLayout | null => {
        if (!grid) {
            return null;
        }

        return {
            cells: createCells(grid),
            sampleOffsets: createSampleOffsets(grid.columns * SUPERSAMPLE),
        };
    }, [grid, createCells, createSampleOffsets]);

    return useMemo(() => {
        return createLayout();
    }, [createLayout]);
};

export { useAsciiLayout };
export type { UseAsciiLayoutReturn };
