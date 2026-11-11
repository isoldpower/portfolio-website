import { useCallback, useMemo } from "react";
import { sleep } from "@shared/lib/utilities";
import {
    BACKGROUND_FADE_DELAY_MS,
    BACKGROUND_FADE_MS,
    EASE_SNAP,
    FLIGHT_MS,
    LAYOUT_SETTLE_MS,
    PARTICLE_FADE_MS,
} from "../../constants.ts";
import { useIntroScene } from "../../scene/use-intro-scene.ts";
import { useIntroStage } from "../../stage/use-intro-stage.ts";
import { useParticleFlight } from "./use-particle-flight.ts";
import { useParticleGroups } from "./use-particle-groups.ts";

import type { IsAlive, RabbitSnapshot, SceneStep } from "../../types.ts";


type UseFlightStepReturn = SceneStep;

const useFlightStep = (): UseFlightStepReturn => {
    const { scene, refs, names } = useIntroScene();
    const store = useIntroStage();
    const buildGroups = useParticleGroups(refs, names);
    const fly = useParticleFlight();

    const hideSources = useCallback(() => {
        [refs.firstWord.current, refs.lastWord.current, refs.snapshot.current].forEach((element) => {
            if (element) {
                element.style.visibility = "hidden";
            }
        });
    }, [refs]);

    const fadeBackground = useCallback((): Promise<Animation> | undefined => {
        return refs.screen.current?.animate(
            [{ backgroundColor: "var(--color-background)" }, { backgroundColor: "transparent" }],
            { duration: BACKGROUND_FADE_MS, delay: BACKGROUND_FADE_DELAY_MS, easing: "ease-in-out", fill: "forwards" }
        ).finished;
    }, [refs]);

    const fadeParticles = useCallback((): Promise<Animation> | undefined => {
        return refs.particles.current?.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: PARTICLE_FADE_MS, easing: EASE_SNAP, fill: "forwards" }
        ).finished;
    }, [refs]);

    const runFlight = useCallback(async (shot: RabbitSnapshot | null, rabbitCanvas: HTMLCanvasElement, isAlive: IsAlive) => {
        await sleep(LAYOUT_SETTLE_MS);

        const groups = buildGroups(shot, rabbitCanvas);
        hideSources();
        const backgroundFade = fadeBackground();

        const particles = refs.particles.current;
        if (particles) {
            await fly(particles, groups, FLIGHT_MS);
        }

        if (isAlive()) {
            store?.setPhase("settle");
            await Promise.all([backgroundFade, fadeParticles()]);
        }
    }, [refs, store, buildGroups, hideSources, fadeBackground, fly, fadeParticles]);

    return useMemo((): SceneStep => {
        return {
            getName: () => {
                return "fly";
            },
            execute: async (isAlive) => {
                if (!scene.rabbitCanvas) {
                    return "skip";
                }

                await runFlight(scene.shot, scene.rabbitCanvas, isAlive);
                return "continue";
            },
        };
    }, [scene, runFlight]);
};

export { useFlightStep };
export type { UseFlightStepReturn };
