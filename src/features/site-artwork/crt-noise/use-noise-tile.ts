import { useCallback, useEffect, useState } from "react";

import {
    CELLS_PER_SIDE,
    NOISE_SEED,
    NOISE_SPECKS,
    NOISE_STRENGTH,
    RANDOM_MODULUS,
    RANDOM_MULTIPLIER,
} from "./constants.ts";


type UseNoiseTileReturn = string | null;

interface NoiseCell {
    row: number;
    column: number;
    color: string;
}

type SeededRandom = () => number;

const useNoiseTile = (): UseNoiseTileReturn => {
    const [tile, setTile] = useState<string | null>(null);

    const createRandom = useCallback((): SeededRandom => {
        let seed = NOISE_SEED;
        return () => {
            seed = (seed * RANDOM_MULTIPLIER) % RANDOM_MODULUS;
            return seed / RANDOM_MODULUS;
        };
    }, []);

    const pickColor = useCallback((random: SeededRandom): string | null => {
        const roll = random();
        const speck = NOISE_SPECKS.find(({ threshold }) => {
            return roll < threshold;
        });
        if (!speck) {
            return null;
        }

        const alpha = (speck.alphaBase + random() * speck.alphaRange) * NOISE_STRENGTH * 2;
        return `rgba(${speck.rgb}, ${alpha.toString()})`;
    }, []);

    const generateCells = useCallback((): NoiseCell[] => {
        const random = createRandom();
        const axis = Array.from({ length: CELLS_PER_SIDE }, (_, index) => {
            return index;
        });

        return axis
            .flatMap((row) => {
                return axis.map((column) => {
                    return { row, column, color: pickColor(random) };
                });
            })
            .filter((cell): cell is NoiseCell => {
                return cell.color !== null;
            });
    }, [createRandom, pickColor]);

    const paintTile = useCallback((): string => {
        const canvas = document.createElement("canvas");
        canvas.width = CELLS_PER_SIDE;
        canvas.height = CELLS_PER_SIDE;

        const context = canvas.getContext("2d");
        if (!context) {
            return "";
        }

        generateCells().forEach(({ row, column, color }) => {
            context.fillStyle = color;
            context.fillRect(column, row, 1, 1);
        });

        return canvas.toDataURL();
    }, [generateCells]);

    useEffect(() => {
        setTile(paintTile());
    }, [paintTile]);

    return tile;
};

export { useNoiseTile };
export type { UseNoiseTileReturn };
