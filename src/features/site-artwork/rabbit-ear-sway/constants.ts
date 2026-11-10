import type { EarRhythm } from "./types.ts";


const EAR_RHYTHMS: readonly EarRhythm[] = [
    {
        uniform: "earA",
        initialPhase: 0,
        frequency: 0.55,
        shiftX: 0,
        shiftY: 1.7,
        stiffness: 70,
        damping: 6.5
    },
    {
        uniform: "earB",
        initialPhase: 1.3,
        frequency: 0.43,
        shiftX: 2.1,
        shiftY: 4.2,
        stiffness: 50,
        damping: 5
    },
];

const MAX_FRAME_DELTA = 0.05;
const ENERGY_DECAY = 1.1;
const ENERGY_PER_PIXEL = 1 / 600;

const IDLE_AMPLITUDE = 0.3;
const ENERGY_AMPLITUDE = 0.7;
const ENERGY_SPEED = 2.6;

const PRIMARY_WAVE_WEIGHT = 0.75;
const SECONDARY_WAVE_WEIGHT = 0.25;
const SECONDARY_WAVE_RATE = 2.3;
const TILT_WAVE_WEIGHT = 0.45;
const TILT_WAVE_RATE = 0.7;

const LIGHT_DIRECTION = [0.75, 0.25, 0.6] as const;

export {
    EAR_RHYTHMS,
    ENERGY_AMPLITUDE,
    ENERGY_DECAY,
    ENERGY_PER_PIXEL,
    ENERGY_SPEED,
    IDLE_AMPLITUDE,
    LIGHT_DIRECTION,
    MAX_FRAME_DELTA,
    PRIMARY_WAVE_WEIGHT,
    SECONDARY_WAVE_RATE,
    SECONDARY_WAVE_WEIGHT,
    TILT_WAVE_RATE,
    TILT_WAVE_WEIGHT,
};
