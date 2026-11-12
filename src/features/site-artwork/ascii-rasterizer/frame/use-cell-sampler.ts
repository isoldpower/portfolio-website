import { useCallback } from "react";

import { CHANNEL_MAX } from "../constants.ts";

import type { AsciiCell, CellSample } from "../types.ts";


type UseCellSamplerReturn = (pixels: Uint8Array, cell: AsciiCell, sampleOffsets: readonly number[]) => CellSample;

const useCellSampler = (): UseCellSamplerReturn => {
    return useCallback((pixels, { offset }, sampleOffsets) => {
        return sampleOffsets.reduce<CellSample>((sample, sampleOffset) => {
            const index = offset + sampleOffset;
            const alpha = pixels[index + 3] / CHANNEL_MAX;
            sample.coverage += alpha;
            sample.luminance += (pixels[index] / CHANNEL_MAX) * alpha;
            return sample;
        }, { coverage: 0, luminance: 0 });
    }, []);
};

export { useCellSampler };
export type { UseCellSamplerReturn };
