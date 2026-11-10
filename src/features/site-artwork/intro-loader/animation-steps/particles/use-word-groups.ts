import { useCallback } from "react";

import { WORD_EXTRUSION, WORD_PARTICLE_STEP } from "../../constants.ts";
import { useWordRect } from "../../geometry/use-word-rect.ts";
import { useTextRaster } from "./use-text-raster.ts";

import type { ParticleGroup, WordEntry } from "../../types.ts";


type UseWordGroupsReturn = (
    entries: readonly WordEntry[],
    title: Element | null
) => ParticleGroup[];

const useWordGroups = (): UseWordGroupsReturn => {
    const wordRect = useWordRect();
    const rasterWord = useTextRaster();

    const withExtrusion = useCallback((
        rect: DOMRect,
        factor: number
    ): DOMRect => {
        const extrusion = WORD_EXTRUSION * factor;

        return new DOMRect(
            rect.left - extrusion,
            rect.top, rect.width + extrusion,
            rect.height + extrusion
        );
    }, []);

    const createGroup = useCallback((
        { element, word, delay }: WordEntry,
        title: Element | null
    ): ParticleGroup | null => {
        const source = wordRect(element, word);
        const destination = wordRect(title, word);
        if (!element || !source || !destination) {
            return null;
        }

        return {
            raster: rasterWord(word, element, source),
            step: WORD_PARTICLE_STEP,
            source: withExtrusion(source, 1),
            destination: withExtrusion(destination, destination.height / source.height),
            delay,
            clip: null,
            targetAlpha: 1,
        };
    }, [wordRect, rasterWord, withExtrusion]);

    return useCallback((entries, title) => {
        return entries
            .map((entry) => createGroup(entry, title))
            .filter((group): group is ParticleGroup => group !== null);
    }, [createGroup]);
};

export { useWordGroups };
export type { UseWordGroupsReturn };
