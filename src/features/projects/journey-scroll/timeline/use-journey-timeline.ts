import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useRef } from "react";

import { HEADER_OFFSET } from "../constants.ts";
import { cameraTravelEnd, pinnedScrollDistance } from "../geometry/journey-geometry.ts";
import { useOverlayTweens } from "./use-overlay-tweens.ts";
import { usePanelTweens } from "./use-panel-tweens.ts";
import { useSceneryTweens } from "./use-scenery-tweens.ts";

import type { JourneyScrollFrame, JourneySelector } from "../types.ts";
import type { RefObject } from "react";


gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseJourneyTimelineParams {
    stageRef: RefObject<HTMLElement | null>;
    stopCount: number;
    onScroll: (scrollFrame: JourneyScrollFrame) => void;
    onTeardown: () => void;
}

type UseJourneyTimelineReturn = RefObject<ScrollTrigger | null>;

const useJourneyTimeline = ({
    stageRef,
    stopCount,
    onScroll,
    onTeardown
}: UseJourneyTimelineParams): UseJourneyTimelineReturn => {
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const addSceneryTweens = useSceneryTweens();
    const addPanelTweens = usePanelTweens();
    const addOverlayTweens = useOverlayTweens();

    const findFrameElement = useCallback((selectElements: JourneySelector): HTMLElement | undefined => {
        return selectElements('[data-journey="frame"]').find((candidateElement): candidateElement is HTMLElement => {
            return candidateElement instanceof HTMLElement;
        });
    }, []);

    const buildTimeline = useCallback((
        stageElement: HTMLElement,
        frameElement: HTMLElement,
        selectElements: JourneySelector
    ) => {
        const travelEnd = cameraTravelEnd(stopCount);
        const journeyTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: stageElement,
                pin: true,
                start: `top top+=${String(HEADER_OFFSET)}`,
                end: `+=${String(pinnedScrollDistance(stopCount))}`,
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: (activeTrigger) => {
                    onScroll({
                        frameElement,
                        selectElements,
                        scrollProgress: activeTrigger.progress,
                        scrollDirection: activeTrigger.direction,
                    });
                },
            },
        });
        const timelineContext = { timeline: journeyTimeline, selectElements, stopCount, travelEnd };

        journeyTimeline.fromTo(
            frameElement,
            { "--journey-cam": 0 },
            { "--journey-cam": travelEnd, duration: travelEnd },
            0
        );
        addSceneryTweens(timelineContext);
        addPanelTweens(timelineContext);
        addOverlayTweens(timelineContext);

        return journeyTimeline;
    }, [stopCount, onScroll, addSceneryTweens, addPanelTweens, addOverlayTweens]);

    useGSAP(() => {
        const stageElement = stageRef.current;
        if (!stageElement || stopCount === 0) {
            return undefined;
        }

        const selectElements = gsap.utils.selector(stageElement);
        const frameElement = findFrameElement(selectElements);
        if (!frameElement) {
            return undefined;
        }

        scrollTriggerRef.current = buildTimeline(stageElement, frameElement, selectElements).scrollTrigger ?? null;
        void document.fonts.ready.then(() => {
            ScrollTrigger.refresh();
        });

        return () => {
            onTeardown();
            scrollTriggerRef.current = null;
        };
    }, {
        scope: stageRef,
        dependencies: [stopCount, buildTimeline, findFrameElement, onTeardown]
    });

    return scrollTriggerRef;
};

export { useJourneyTimeline };
export type { UseJourneyTimelineParams, UseJourneyTimelineReturn };
