import { toPixelHills } from "@shared/ui-toolkit/pixel-sprite";

import { JOURNEY_COLORS } from "./colors.ts";

import type { PixelHills } from "@shared/ui-toolkit/pixel-sprite";


const HILL_TILE_WIDTH = 896;
const HILL_STEP = 2;

const FAR_HILLS: PixelHills = {
    tileWidth: HILL_TILE_WIDTH,
    height: 96,
    base: 52,
    amplitude: 22,
    waves: [3, 7, 17],
    step: HILL_STEP,
    fill: JOURNEY_COLORS.farHill,
};

const NEAR_HILLS: PixelHills = {
    tileWidth: HILL_TILE_WIDTH,
    height: 60,
    base: 26,
    amplitude: 12,
    waves: [2, 5, 11],
    step: HILL_STEP,
    fill: JOURNEY_COLORS.nearHill,
};

const JOURNEY_HILLS = [
    { url: toPixelHills(FAR_HILLS), height: FAR_HILLS.height, parallax: 0.2 },
    { url: toPixelHills(NEAR_HILLS), height: NEAR_HILLS.height, parallax: 0.4 },
] as const;

export { HILL_TILE_WIDTH, JOURNEY_HILLS };
