import { useCallback, useRef } from "react";

import { CRAWL_MS, CRAWL_STAGGER_MS, CRAWL_STEPS, RING_RADIUS } from "../constants.ts";

import type { CellArranger } from "@shared/lib/types";


interface UseCrawlArrangerParams {
    cell: number;
    isEnabled: boolean;
}

const useCrawlArranger = ({ cell, isEnabled }: UseCrawlArrangerParams): CellArranger => {
    const crawlStartedAt = useRef<number | null>(null);
    const isCrawlSettled = useRef(!isEnabled);

    const steppedCrawlProgress = useCallback((elapsedMs: number, delayMs: number): number => {
        const linearProgress = Math.min(1, Math.max(0, (elapsedMs - delayMs) / CRAWL_MS));
        const easedProgress = 1 - Math.pow(1 - linearProgress, 2);

        return Math.floor(easedProgress * CRAWL_STEPS) / CRAWL_STEPS;
    }, []);

    const snapToCell = useCallback((offset: number): number => {
        return Math.round(offset / cell) * cell;
    }, [cell]);

    return useCallback((restingX, restingY, canvasWidth, canvasHeight, placement) => {
        placement.x = restingX;
        placement.y = restingY;
        if (isCrawlSettled.current) {
            return;
        }

        const now = performance.now();
        crawlStartedAt.current ??= now;
        const elapsedMs = now - crawlStartedAt.current;
        if (elapsedMs >= CRAWL_MS + CRAWL_STAGGER_MS) {
            isCrawlSettled.current = true;
            return;
        }

        const ringRadius = Math.min(canvasWidth, canvasHeight) * RING_RADIUS;
        const deltaX = restingX - canvasWidth / 2;
        const deltaY = restingY - canvasHeight / 2;
        const distanceFromCenter = Math.hypot(deltaX, deltaY) || 1;
        const distanceFromRing = Math.min(1, Math.abs(distanceFromCenter - ringRadius) / ringRadius);
        const remainingTravel = 1 - steppedCrawlProgress(elapsedMs, distanceFromRing * CRAWL_STAGGER_MS);
        const ringX = canvasWidth / 2 + (deltaX / distanceFromCenter) * ringRadius;
        const ringY = canvasHeight / 2 + (deltaY / distanceFromCenter) * ringRadius;

        placement.x = restingX + snapToCell((ringX - restingX) * remainingTravel);
        placement.y = restingY + snapToCell((ringY - restingY) * remainingTravel);
    }, [steppedCrawlProgress, snapToCell]);
};

export { useCrawlArranger };
export type { UseCrawlArrangerParams };
