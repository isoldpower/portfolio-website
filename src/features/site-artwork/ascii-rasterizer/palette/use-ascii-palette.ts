import { useCallback, useMemo } from "react";

import { PALETTE_TOKENS } from "../constants.ts";
import { useGlyphFont } from "./use-glyph-font.ts";

import type { AsciiPalette } from "../types.ts";


type UseAsciiPaletteReturn = AsciiPalette;

const useAsciiPalette = (cell: number): UseAsciiPaletteReturn => {
    const { font, isLoaded } = useGlyphFont(cell);

    const readColors = useCallback((): readonly string[] => {
        const styles = getComputedStyle(document.documentElement);
        return PALETTE_TOKENS.map((token) => {
            return styles.getPropertyValue(token).trim();
        });
    }, []);

    const colors = useMemo(() => {
        return isLoaded ? readColors() : [];
    }, [isLoaded, readColors]);

    return useMemo(() => {
        return { colors, font, isReady: isLoaded };
    }, [colors, font, isLoaded]);
};

export { useAsciiPalette };
export type { UseAsciiPaletteReturn };
