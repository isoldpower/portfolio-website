const REVEAL_MARKERS = {
    rise: "scroll-rise",
    scan: "scroll-scan",
    stagger: "scroll-stagger",
    sink: "scroll-sink",
} as const;

const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";
const ENTER_START = "top 88%";
const PIXEL_GRID = 4;

const RISE_OFFSET = 28;
const RISE_STEPS = 6;
const RISE_DURATION = 0.48;
const RISE_STAGGER = 0.09;

const SCAN_STEPS = 14;
const SCAN_DURATION = 0.7;

const STAGGER_OFFSET = -16;
const STAGGER_STEPS = 4;
const STAGGER_DURATION = 0.32;
const STAGGER_INTERVAL = 0.07;

const SINK_DISTANCE = 160;

export {
    REVEAL_MARKERS,
    MOTION_QUERY,
    ENTER_START,
    PIXEL_GRID,
    RISE_OFFSET,
    RISE_STEPS,
    RISE_DURATION,
    RISE_STAGGER,
    SCAN_STEPS,
    SCAN_DURATION,
    STAGGER_OFFSET,
    STAGGER_STEPS,
    STAGGER_DURATION,
    STAGGER_INTERVAL,
    SINK_DISTANCE
};
