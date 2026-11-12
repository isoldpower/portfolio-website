import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback } from "react";

import {
    ENTER_START,
    REVEAL_MARKERS,
    RISE_DURATION,
    RISE_OFFSET,
    RISE_STAGGER,
    RISE_STEPS,
    SCAN_DURATION,
    SCAN_STEPS,
    STAGGER_DURATION,
    STAGGER_INTERVAL,
    STAGGER_OFFSET,
    STAGGER_STEPS
} from "../constants.ts";


type UseEnterRevealsReturn = () => void;

const useEnterReveals = (): UseEnterRevealsReturn => {
    const riseEffectCallback = useCallback((batch: Element[]) => {
        gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: RISE_DURATION,
            ease: `steps(${String(RISE_STEPS)})`,
            stagger: RISE_STAGGER,
            clearProps: "transform,opacity,visibility",
        });
    }, []);

    const scanEffectCallback = useCallback((batch: Element[]) => {
        gsap.timeline()
            .to(batch, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: SCAN_DURATION,
                ease: `steps(${String(SCAN_STEPS)})`,
                stagger: RISE_STAGGER,
            }, 0)
            .to(batch, {
                keyframes: { opacity: [0.4, 1, 0.55, 1] },
                duration: SCAN_DURATION,
                ease: "steps(4)",
                clearProps: "clipPath,opacity",
            }, 0);
    }, []);

    const stagerEffectCallback = useCallback((batch: Element[]) => {
        gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            duration: STAGGER_DURATION,
            ease: `steps(${String(STAGGER_STEPS)})`,
            stagger: STAGGER_INTERVAL,
            clearProps: "transform,opacity,visibility",
        });
    }, []);

    const addRise = useCallback(() => {
        const targets = gsap.utils.toArray<HTMLElement>(`.${REVEAL_MARKERS.rise}`);

        gsap.set(targets, { autoAlpha: 0, y: RISE_OFFSET });
        ScrollTrigger.batch(targets, {
            start: ENTER_START,
            once: true,
            onEnter: riseEffectCallback,
        });
    }, []);

    const addScan = useCallback(() => {
        const targets = gsap.utils.toArray<HTMLElement>(`.${REVEAL_MARKERS.scan}`);

        gsap.set(targets, { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.4 });
        ScrollTrigger.batch(targets, {
            start: ENTER_START,
            once: true,
            onEnter: scanEffectCallback,
        });
    }, []);

    const addStagger = useCallback(() => {
        const targets = gsap.utils.toArray<HTMLElement>(`.${REVEAL_MARKERS.stagger} > *`);

        gsap.set(targets, { autoAlpha: 0, x: STAGGER_OFFSET });
        ScrollTrigger.batch(targets, {
            start: ENTER_START,
            once: true,
            onEnter: stagerEffectCallback,
        });
    }, []);

    return useCallback(() => {
        addRise();
        addScan();
        addStagger();
    }, [addRise, addScan, addStagger]);
};

export { useEnterReveals };
export type { UseEnterRevealsReturn };
