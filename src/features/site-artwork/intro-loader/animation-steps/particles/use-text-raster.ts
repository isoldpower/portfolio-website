import { useCallback } from "react";

import {
    WORD_ASCENT_RATIO,
    WORD_EXTRUSION,
    WORD_EXTRUSION_COLOR,
    WORD_EXTRUSION_LAYERS,
    WORD_FALLBACK_FONT_SIZE,
} from "../../constants.ts";


type UseTextRasterReturn = (word: string, element: HTMLElement, rect: DOMRect) => HTMLCanvasElement;

const useTextRaster = (): UseTextRasterReturn => {
    const createCanvas = useCallback((rect: DOMRect): HTMLCanvasElement => {
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(rect.width + WORD_EXTRUSION);
        canvas.height = Math.ceil(rect.height + WORD_EXTRUSION);

        return canvas;
    }, []);

    const paintExtrusion = useCallback((context: CanvasRenderingContext2D, word: string, ascent: number) => {
        context.fillStyle = WORD_EXTRUSION_COLOR;
        WORD_EXTRUSION_LAYERS.forEach((depth) => {
            context.fillText(word, -depth, ascent + depth);
        });
    }, []);

    return useCallback((word, element, rect) => {
        const styles = getComputedStyle(element);
        const fontSize = parseFloat(styles.fontSize) || WORD_FALLBACK_FONT_SIZE;
        const canvas = createCanvas(rect);
        const context = canvas.getContext("2d");
        if (!context) {
            return canvas;
        }

        context.font = `${styles.fontWeight} ${fontSize.toString()}px ${styles.fontFamily}`;
        context.fontStretch = "condensed";

        const metrics = context.measureText(word);
        const ascent = metrics.fontBoundingBoxAscent || fontSize * WORD_ASCENT_RATIO;
        context.translate(WORD_EXTRUSION, 0);
        context.scale(rect.width / (metrics.width || 1), 1);

        paintExtrusion(context, word, ascent);
        context.fillStyle = styles.color;
        context.fillText(word, 0, ascent);

        return canvas;
    }, [createCanvas, paintExtrusion]);
};

export { useTextRaster };
export type { UseTextRasterReturn };
