const TILE_SIZE = 128;
const CELL_SIZE = 2;
const CELLS_PER_SIDE = TILE_SIZE / CELL_SIZE;

const NOISE_STRENGTH = 0.5;
const NOISE_SEED = 7;

const RANDOM_MULTIPLIER = 16807;
const RANDOM_MODULUS = 2147483647;

const NOISE_SPECKS = [
    { threshold: 0.05, rgb: "120, 165, 255", alphaBase: 0.03, alphaRange: 0.07 },
    { threshold: 0.15, rgb: "2, 4, 10", alphaBase: 0.06, alphaRange: 0.1 },
] as const;

export {
    CELLS_PER_SIDE,
    NOISE_SEED,
    NOISE_SPECKS,
    NOISE_STRENGTH,
    RANDOM_MODULUS,
    RANDOM_MULTIPLIER,
};
