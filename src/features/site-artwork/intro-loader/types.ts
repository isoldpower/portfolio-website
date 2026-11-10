import type { IntroStageLabel } from "@entities/site-artwork/intro-loader";
import type { PARTICLE_STEP_ORDERS } from "./constants.ts";
import type { SceneState } from "./scene/SceneState.ts";
import type { RefObject } from "react";


type IntroPhase = "load" | "type" | "morph" | "fly" | "settle" | "done";

type IntroTargetRole = "title";

interface IntroSnapshot {
    phase: IntroPhase;
    isStaggered: boolean;
}

interface RabbitSnapshot {
    src: string;
    rect: DOMRect;
    filter: string;
}

interface SnapshotView {
    src: string;
    width: number;
    height: number;
    filter: string;
}

interface ParticleGroup {
    raster: HTMLCanvasElement;
    step: number;
    source: DOMRect;
    destination: DOMRect;
    delay: number;
    clip: DOMRect | null;
    targetAlpha: number;
}

type StepOrder = typeof PARTICLE_STEP_ORDERS[number];

interface Particle {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    stepsX: number;
    stepsY: number;
    order: StepOrder;
    delay: number;
    seed: number;
    level: number;
    color: string;
    isClipped: boolean;
    targetAlpha: number;
}

interface FlightGroup {
    particles: Particle[];
    sourceSize: number;
    targetSize: number;
}

interface PixelBounds {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

type SequenceStep = "load" | "type" | "morph" | "fly";

interface IntroSequenceRefs {
    screen: RefObject<HTMLDivElement | null>;
    firstWord: RefObject<HTMLSpanElement | null>;
    lastWord: RefObject<HTMLSpanElement | null>;
    gloss: RefObject<HTMLSpanElement | null>;
    snapshot: RefObject<HTMLImageElement | null>;
    particles: RefObject<HTMLCanvasElement | null>;
}

type IsAlive = () => boolean;

type FinishSequence = (isStaggered: boolean) => void;

type SceneOutcome = "continue" | "skip" | "abort";

interface SceneView {
    step: SequenceStep;
    isFinished: boolean;
    progress: number;
    stage: IntroStageLabel;
    typed: string;
    gloss: string;
    glossWidth: number | null;
    snapshot: SnapshotView | null;
    isSnapshotRevealed: boolean;
}

interface SceneStep {
    getName: () => SequenceStep;
    execute: () => Promise<SceneOutcome>;
}

type RunSequence = (isAlive: IsAlive, finish: FinishSequence) => Promise<void>;

interface WordEntry {
    element: HTMLElement | null;
    word: string;
    delay: number;
}

interface IntroNames {
    firstName: string;
    lastName: string;
}

interface IntroSceneValue {
    scene: SceneState;
    refs: IntroSequenceRefs;
    names: IntroNames;
}

export type {
    IntroPhase,
    IntroSnapshot,
    IntroTargetRole,
    FlightGroup,
    FinishSequence,
    IntroNames,
    IntroSceneValue,
    IntroSequenceRefs,
    IsAlive,
    Particle,
    ParticleGroup,
    PixelBounds,
    RabbitSnapshot,
    RunSequence,
    SceneView,
    SceneOutcome,
    SceneStep,
    SequenceStep,
    SnapshotView,
    StepOrder,
    WordEntry,
};
