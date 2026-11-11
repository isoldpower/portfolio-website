import type { JourneyState, MeadowDecoration, MeadowLandmark } from "./types.ts";


const TRAVEL_LENGTH = 1200;
const HOLD_LENGTH = 1320;
const PANEL_TRAVEL = 1600;
const SCROLL_PER_CAMERA = 5600 / 8760;
const STAGE_HEIGHT = 760;
const HEADER_OFFSET = 50;
const MIN_STAGE_FIT = 0.5;

const RUN_FRAME_LENGTH = 28;
const RUN_FRAME_COUNT = 6;
const RUN_FRAME_WIDTH = 96;
const RUN_IDLE_MS = 280;
const HOP_FRAME = 1;
const HOP_CYCLE = 3;

const START_FADE = [0.003, 0.02] as const;
const FINISH_FADE = [0.975, 0.995] as const;
const SCENE_FADE = [0.3, 0.7] as const;
const SHOT_MIX = [0.25, 0.6] as const;
const FADE_EASE = "power1.inOut";
const SHADE_OPACITY = 0.6;
const SHOT_SHIFT = 12;
const VIEW_DIM = 0.35;
const SHOT_MARKERS = [0, 1] as const;

const INITIAL_JOURNEY_STATE: JourneyState = {
    phase: "start",
    activeStopIndex: null,
    reachedStopCount: 0,
    livePanelIndex: null,
};
const START_MIDPOINT = (START_FADE[0] + START_FADE[1]) / 2;
const LIVE_RANGE = TRAVEL_LENGTH / 3;
const STOP_RANGE = TRAVEL_LENGTH / 2;

const MEADOW_REPEAT = 1560;
const MEADOW_VIEW = [-600, 1600] as const;
const BURIED_CARROT_OFFSET = 92;

const MEADOW_DECORATIONS: readonly MeadowDecoration[] = [
    ["tuftA", 40], ["rock", 150], ["flowers", 260], ["tuftB", 380], ["bush", 520], ["tuftA", 640],
    ["flowers", 770], ["rock", 900], ["tuftB", 1010], ["bush", 1150], ["tuftA", 1290], ["flowers", 1420],
];

const MEADOW_START_LANDMARKS: readonly MeadowLandmark[] = [
    { key: "burrow", spriteName: "burrow", worldX: -110 },
    { key: "sign-start", spriteName: "signStart", worldX: 200 },
];

const MEADOW_FINISH_LANDMARKS: readonly MeadowLandmark[] = [
    { key: "sprout-a", spriteName: "sprout", worldX: 136 },
    { key: "sprout-b", spriteName: "sprout", worldX: 152 },
    { key: "finish", spriteName: "finish", worldX: 172 },
];

const SCORE_DIGITS = 5;
const ORDER_DIGITS = 2;
const PERCENT = 100;
const EMPTY_LOCATION = "--";

export {
    BURIED_CARROT_OFFSET,
    EMPTY_LOCATION,
    FADE_EASE,
    FINISH_FADE,
    HEADER_OFFSET,
    HOLD_LENGTH,
    HOP_CYCLE,
    HOP_FRAME,
    INITIAL_JOURNEY_STATE,
    LIVE_RANGE,
    MEADOW_DECORATIONS,
    MEADOW_FINISH_LANDMARKS,
    MEADOW_REPEAT,
    MEADOW_START_LANDMARKS,
    MEADOW_VIEW,
    MIN_STAGE_FIT,
    ORDER_DIGITS,
    PANEL_TRAVEL,
    PERCENT,
    RUN_FRAME_COUNT,
    RUN_FRAME_LENGTH,
    RUN_FRAME_WIDTH,
    RUN_IDLE_MS,
    SCENE_FADE,
    SCORE_DIGITS,
    SCROLL_PER_CAMERA,
    SHADE_OPACITY,
    SHOT_MARKERS,
    SHOT_MIX,
    SHOT_SHIFT,
    STAGE_HEIGHT,
    START_FADE,
    START_MIDPOINT,
    STOP_RANGE,
    TRAVEL_LENGTH,
    VIEW_DIM,
};
