type EarUniform = "earA" | "earB";

interface EarRhythm {
    uniform: EarUniform;
    initialPhase: number;
    frequency: number;
    shiftX: number;
    shiftY: number;
    stiffness: number;
    damping: number;
}

interface SpringAxis {
    angle: number;
    velocity: number;
}

interface EarState {
    rhythm: EarRhythm;
    phase: number;
    axes: readonly SpringAxis[];
}

interface SwayDrive {
    delta: number;
    amplitude: number;
    speed: number;
}

export type { EarRhythm, EarState, EarUniform, SpringAxis, SwayDrive };
