import { useEffect, useMemo, useState } from "react";

import { GLYPH_FONT_FAMILY, GLYPH_FONT_WEIGHT, GLYPH_SCALE } from "../constants.ts";


interface GlyphFont {
    font: string;
    isLoaded: boolean;
}

type UseGlyphFontReturn = GlyphFont;

const useGlyphFont = (cell: number): UseGlyphFontReturn => {
    const [isLoaded, setIsLoaded] = useState(false);

    const font = useMemo(() => {
        const size = Math.round(cell * GLYPH_SCALE);
        return `${GLYPH_FONT_WEIGHT.toString()} ${size.toString()}px ${GLYPH_FONT_FAMILY}`;
    }, [cell]);

    useEffect(() => {
        let isAlive = true;
        void document.fonts.load(font).finally(() => {
            if (isAlive) {
                setIsLoaded(true);
            }
        });

        return () => {
            isAlive = false;
        };
    }, [font]);

    return useMemo(() => {
        return { font, isLoaded };
    }, [font, isLoaded]);
};

export { useGlyphFont };
export type { GlyphFont, UseGlyphFontReturn };
