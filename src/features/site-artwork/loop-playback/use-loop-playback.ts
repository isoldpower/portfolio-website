import { useCallback } from "react";

import { usePrefersReducedMotion } from "@shared/lib/hooks";

import { VISIBLE_THRESHOLD } from "./constants.ts";

import type { RefCallback } from "react";


type UseLoopPlaybackReturn = RefCallback<HTMLVideoElement>;

const useLoopPlayback = (): UseLoopPlaybackReturn => {
    const isReducedMotion = usePrefersReducedMotion();

    const playWhileVisible = useCallback((videoElement: HTMLVideoElement) => {
        const visibilityObserver = new IntersectionObserver(([visibilityEntry]) => {
            if (visibilityEntry?.isIntersecting) {
                void videoElement.play().catch(() => {
                    return undefined;
                });
                return;
            }

            videoElement.pause();
        }, { threshold: VISIBLE_THRESHOLD });

        visibilityObserver.observe(videoElement);

        return () => {
            visibilityObserver.disconnect();
        };
    }, []);

    return useCallback((videoElement: HTMLVideoElement | null) => {
        if (!videoElement) {
            return undefined;
        }

        videoElement.muted = true;
        if (isReducedMotion) {
            videoElement.pause();
            return undefined;
        }

        return playWhileVisible(videoElement);
    }, [isReducedMotion, playWhileVisible]);
};

export { useLoopPlayback };
export type { UseLoopPlaybackReturn };
