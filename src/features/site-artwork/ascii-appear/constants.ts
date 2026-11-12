const RING_RADIUS = 0.3;
const RING_STEP_MS = 1000 / 30;
const RING_DRAW_RATE = 3;
const RING_TAIL = 3;
const RING_MIN_POINTS = 12;
const RING_FALLBACK_GLYPH = "+";
const RING_DIM_ALPHA = 0.55;
const RING_TOKENS = ["--color-ascii-shadow", "--color-ascii-mid", "--color-ascii-light"] as const;
const RING_FONT_SCALE = 1.15;
const RING_FONT = `700 {size}px "IBM Plex Mono", ui-monospace, monospace`;
const MAX_PIXEL_RATIO = 2;

const CRAWL_MS = 560;
const CRAWL_STAGGER_MS = 260;
const CRAWL_STEPS = 9;

export {
    CRAWL_MS,
    CRAWL_STAGGER_MS,
    CRAWL_STEPS,
    MAX_PIXEL_RATIO,
    RING_DIM_ALPHA,
    RING_DRAW_RATE,
    RING_FALLBACK_GLYPH,
    RING_FONT,
    RING_FONT_SCALE,
    RING_MIN_POINTS,
    RING_RADIUS,
    RING_STEP_MS,
    RING_TAIL,
    RING_TOKENS
};
