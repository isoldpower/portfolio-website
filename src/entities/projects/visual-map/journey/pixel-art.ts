import { toPixelArt } from "@shared/ui-toolkit/pixel-sprite";

import {
    BURIED_CARROT_PALETTE,
    DIM_CARROT_PALETTE,
    HIGHLIGHTED_FLAG_PALETTE,
    LIT_CARROT_PALETTE,
    MEADOW_PALETTE,
    MINI_RABBIT_PALETTE,
    PENDING_FLAG_PALETTE,
    REACHED_FLAG_PALETTE,
} from "./palettes.ts";
import {
    BURIED_CARROT_ROWS,
    BURROW_ROWS,
    BUSH_ROWS,
    FINISH_ROWS,
    FLAG_DOWN_ROWS,
    FLAG_UP_ROWS,
    FLAG_WAVE_ROWS,
    FLOWERS_ROWS,
    MINI_CARROT_ROWS,
    MINI_RABBIT_ROWS,
    ROCK_ROWS,
    SIGN_START_ROWS,
    SPROUT_ROWS,
    TUFT_A_ROWS,
    TUFT_B_ROWS,
} from "./pixel-rows.ts";


const MEADOW_SPRITES = {
    signStart: toPixelArt(SIGN_START_ROWS, MEADOW_PALETTE),
    finish: toPixelArt(FINISH_ROWS, MEADOW_PALETTE),
    burrow: toPixelArt(BURROW_ROWS, MEADOW_PALETTE),
    tuftA: toPixelArt(TUFT_A_ROWS, MEADOW_PALETTE),
    tuftB: toPixelArt(TUFT_B_ROWS, MEADOW_PALETTE),
    rock: toPixelArt(ROCK_ROWS, MEADOW_PALETTE),
    flowers: toPixelArt(FLOWERS_ROWS, MEADOW_PALETTE),
    bush: toPixelArt(BUSH_ROWS, MEADOW_PALETTE),
    sprout: toPixelArt(SPROUT_ROWS, MEADOW_PALETTE),
} as const;

type MeadowSpriteName = keyof typeof MEADOW_SPRITES;

const FLAG_SPRITES = {
    reached: toPixelArt(FLAG_UP_ROWS, REACHED_FLAG_PALETTE),
    pending: toPixelArt(FLAG_DOWN_ROWS, PENDING_FLAG_PALETTE),
    preview: toPixelArt(FLAG_UP_ROWS, HIGHLIGHTED_FLAG_PALETTE),
    waving: toPixelArt(FLAG_WAVE_ROWS, HIGHLIGHTED_FLAG_PALETTE),
} as const;

const MINI_RABBIT = toPixelArt(MINI_RABBIT_ROWS, MINI_RABBIT_PALETTE);

const MINI_CARROT = {
    lit: toPixelArt(MINI_CARROT_ROWS, LIT_CARROT_PALETTE),
    dim: toPixelArt(MINI_CARROT_ROWS, DIM_CARROT_PALETTE),
} as const;

const BURIED_CARROT = toPixelArt(BURIED_CARROT_ROWS, BURIED_CARROT_PALETTE);

export { BURIED_CARROT, FLAG_SPRITES, MEADOW_SPRITES, MINI_CARROT, MINI_RABBIT };
export type { MeadowSpriteName };
