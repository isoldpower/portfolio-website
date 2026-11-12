import type { JourneyStop } from "@entities/projects/model";
import type { MeadowSpriteName } from "@entities/projects/visual-map";
import type { RefObject } from "react";


type JourneyPhase = "start" | "travel" | "stop" | "finish";

interface JourneyState {
    phase: JourneyPhase;
    activeStopIndex: number | null;
    reachedStopCount: number;
    livePanelIndex: number | null;
}

type JourneySelector = (selector: string) => Element[];

interface JourneyTimelineContext {
    timeline: gsap.core.Timeline;
    selectElements: JourneySelector;
    stopCount: number;
    travelEnd: number;
}

type JourneyTweenBuilder = (context: JourneyTimelineContext) => void;

interface JourneyScrollFrame {
    frameElement: HTMLElement;
    selectElements: JourneySelector;
    scrollProgress: number;
    scrollDirection: number;
}

interface MeadowItem {
    key: string;
    spriteName: MeadowSpriteName;
    worldX: number;
}

type MeadowLandmark = MeadowItem;

type MeadowDecoration = readonly [MeadowSpriteName, number];

interface JourneyContextValue {
    journeyStops: readonly JourneyStop[];
    stageRef: RefObject<HTMLDivElement | null>;
    journeyState: JourneyState;
    skipTargetHref: string;
    jumpToStop: (stopIndex: number) => void;
}

export type {
    JourneyContextValue,
    JourneyPhase,
    JourneyScrollFrame,
    JourneySelector,
    JourneyState,
    JourneyTimelineContext,
    JourneyTweenBuilder,
    MeadowDecoration,
    MeadowItem,
    MeadowLandmark,
};
