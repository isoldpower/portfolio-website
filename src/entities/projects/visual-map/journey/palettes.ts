import { JOURNEY_COLORS } from "./colors.ts";


const MEADOW_PALETTE = {
    k: JOURNEY_COLORS.soil,
    n: JOURNEY_COLORS.grass,
    m: JOURNEY_COLORS.deep,
    s: JOURNEY_COLORS.extrude,
    g: JOURNEY_COLORS.foreground,
} as const;
const REACHED_FLAG_PALETTE = {
    P: JOURNEY_COLORS.blue,
    F: JOURNEY_COLORS.blue
} as const;
const PENDING_FLAG_PALETTE = {
    P: JOURNEY_COLORS.extrude,
    F: JOURNEY_COLORS.extrude
} as const;
const HIGHLIGHTED_FLAG_PALETTE = {
    P: JOURNEY_COLORS.blue,
    F: JOURNEY_COLORS.highlight
} as const;

const MINI_RABBIT_PALETTE = {
    L: JOURNEY_COLORS.blue,
    E: JOURNEY_COLORS.dark
} as const;
const LIT_CARROT_PALETTE = {
    L: JOURNEY_COLORS.blue,
    O: JOURNEY_COLORS.foreground,
    S: JOURNEY_COLORS.deep
} as const;
const DIM_CARROT_PALETTE = {
    L: JOURNEY_COLORS.extrude,
    O: JOURNEY_COLORS.extrude,
    S: JOURNEY_COLORS.deep
} as const;

const BURIED_CARROT_PALETTE = {
    L: JOURNEY_COLORS.blue,
    H: JOURNEY_COLORS.highlight,
    O: JOURNEY_COLORS.foreground,
    S: JOURNEY_COLORS.extrude,
    D: JOURNEY_COLORS.deep,
} as const;

export {
    BURIED_CARROT_PALETTE,
    DIM_CARROT_PALETTE,
    HIGHLIGHTED_FLAG_PALETTE,
    LIT_CARROT_PALETTE,
    MEADOW_PALETTE,
    MINI_RABBIT_PALETTE,
    PENDING_FLAG_PALETTE,
    REACHED_FLAG_PALETTE,
};
