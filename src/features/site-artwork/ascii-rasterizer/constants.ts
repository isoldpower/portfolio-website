const SUPERSAMPLE = 3;
const SAMPLES_PER_CELL = SUPERSAMPLE * SUPERSAMPLE;
const SUPERSAMPLE_AXIS = Array.from({ length: SUPERSAMPLE }, (_, index) => {
    return index;
});
const RGBA_CHANNELS = 4;
const CHANNEL_MAX = 255;

const FRAME_INTERVAL = 1 / 30;
const RASTER_PRIORITY = 1;

const MIN_COVERAGE = 0.12;
const COVERAGE_RANGE = 0.55;
const COVERAGE_GAMMA = 0.9;
const SHADE_THRESHOLDS = [0.36, 0.66] as const;
const FALLBACK_GLYPH = "@";

const MIN_CELLS = 4;
const MAX_PIXEL_RATIO = 2;

const PALETTE_TOKENS = [
    "--color-ascii-shadow",
    "--color-ascii-mid",
    "--color-ascii-light"
] as const;

const GLYPH_SCALE = 1.15;
const GLYPH_FONT_FAMILY = `"IBM Plex Mono", ui-monospace, monospace`;
const GLYPH_FONT_WEIGHT = 700;

const CAMERA_DISTANCE = 6;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 20;
const SWAY_MARGIN = 0.06;

export {
    CAMERA_DISTANCE,
    CAMERA_FAR,
    CAMERA_NEAR,
    CHANNEL_MAX,
    COVERAGE_GAMMA,
    COVERAGE_RANGE,
    FALLBACK_GLYPH,
    FRAME_INTERVAL,
    GLYPH_FONT_FAMILY,
    GLYPH_FONT_WEIGHT,
    GLYPH_SCALE,
    MAX_PIXEL_RATIO,
    MIN_CELLS,
    MIN_COVERAGE,
    PALETTE_TOKENS,
    RASTER_PRIORITY,
    RGBA_CHANNELS,
    SAMPLES_PER_CELL,
    SHADE_THRESHOLDS,
    SUPERSAMPLE,
    SUPERSAMPLE_AXIS,
    SWAY_MARGIN,
};
