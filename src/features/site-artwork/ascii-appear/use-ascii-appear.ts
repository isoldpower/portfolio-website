import { useCallback, useMemo, useState } from "react";

import { usePrefersReducedMotion } from "@shared/lib/hooks";

import { useCrawlArranger } from "./crawl/use-crawl-arranger.ts";
import { useRingLoader } from "./ring/use-ring-loader.ts";

import type { CellArranger } from "@shared/lib/types";
import type { RefObject } from "react";


interface UseAsciiAppearParams {
    canvas: RefObject<HTMLCanvasElement | null>;
    cell: number;
    glyphs: string;
    isIntroDone: boolean;
    onDraw: (canvas: HTMLCanvasElement) => void;
}

interface UseAsciiAppearReturn {
    arrange: CellArranger;
    handleDraw: (canvas: HTMLCanvasElement) => void;
}

const useAsciiAppear = ({
    canvas,
    cell,
    glyphs,
    isIntroDone,
    onDraw,
}: UseAsciiAppearParams): UseAsciiAppearReturn => {
    const isReducedMotion = usePrefersReducedMotion();
    const [isAppearEnabled] = useState(() => {
        return isIntroDone && !isReducedMotion;
    });
    const stopRing = useRingLoader({ canvas, cell, glyphs, isEnabled: isAppearEnabled });
    const arrange = useCrawlArranger({ cell, isEnabled: isAppearEnabled });

    const handleDraw = useCallback((drawnCanvas: HTMLCanvasElement) => {
        stopRing();
        onDraw(drawnCanvas);
    }, [stopRing, onDraw]);

    return useMemo(() => {
        return { arrange, handleDraw };
    }, [arrange, handleDraw]);
};

export { useAsciiAppear };
export type { UseAsciiAppearParams, UseAsciiAppearReturn };
