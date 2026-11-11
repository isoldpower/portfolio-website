import { useCallback, useMemo, useRef } from "react";

import { HOP_CYCLE, HOP_FRAME, RUN_FRAME_COUNT, RUN_FRAME_LENGTH, RUN_FRAME_WIDTH, RUN_IDLE_MS } from "../constants.ts";

import type { JourneySelector } from "../types.ts";


interface RabbitMotionFrame {
    frameElement: HTMLElement;
    selectElements: JourneySelector;
    cameraPosition: number;
    scrollDirection: number;
    isRunning: boolean;
}

interface UseRabbitMotionReturn {
    moveRabbit: (motionFrame: RabbitMotionFrame) => void;
    stopRabbit: () => void;
}

const useRabbitMotion = (): UseRabbitMotionReturn => {
    const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const stopRabbit = useCallback(() => {
        clearTimeout(idleTimer.current);
    }, []);

    const findHtmlElement = useCallback((
        selectElements: JourneySelector,
        selector: string
    ): HTMLElement | undefined => {
        return selectElements(selector).find((candidateElement): candidateElement is HTMLElement => {
            return candidateElement instanceof HTMLElement;
        });
    }, []);

    const scheduleIdlePose = useCallback((
        rabbitElement: HTMLElement | undefined,
        miniRabbitElement: HTMLElement | undefined
    ) => {
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
            rabbitElement?.setAttribute("data-running", "false");
            miniRabbitElement?.setAttribute("data-hop", "false");
        }, RUN_IDLE_MS);
    }, []);

    const moveRabbit = useCallback((motionFrame: RabbitMotionFrame) => {
        const { frameElement, selectElements, cameraPosition, scrollDirection, isRunning } = motionFrame;
        const rabbitElement = findHtmlElement(selectElements, '[data-journey="rabbit"]');
        const runStripElement = findHtmlElement(selectElements, '[data-journey="rabbit-run"]');
        const miniRabbitElement = findHtmlElement(selectElements, '[data-journey="mini-rabbit"]');
        const runFrameIndex = Math.floor(cameraPosition / RUN_FRAME_LENGTH) % RUN_FRAME_COUNT;
        const isHopFrame = runFrameIndex % HOP_CYCLE === HOP_FRAME;

        frameElement.dataset.direction = scrollDirection < 0 ? "backward" : "forward";
        if (runStripElement) {
            runStripElement.style.backgroundPositionX = `${String(-runFrameIndex * RUN_FRAME_WIDTH)}px`;
        }

        rabbitElement?.setAttribute("data-running", String(isRunning));
        miniRabbitElement?.setAttribute("data-hop", String(isRunning && isHopFrame));
        scheduleIdlePose(rabbitElement, miniRabbitElement);
    }, [findHtmlElement, scheduleIdlePose]);

    return useMemo(() => {
        return { moveRabbit, stopRabbit };
    }, [moveRabbit, stopRabbit]);
};

export { useRabbitMotion };
export type { RabbitMotionFrame, UseRabbitMotionReturn };
