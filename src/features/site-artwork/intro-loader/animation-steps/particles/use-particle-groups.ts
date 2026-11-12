import { useCallback } from "react";

import { WORD_FLIGHT_DELAYS } from "../../constants.ts";
import { useIntroStage } from "../../stage/use-intro-stage.ts";
import { useRabbitGroup } from "./use-rabbit-group.ts";
import { useWordGroups } from "./use-word-groups.ts";

import type { IntroNames, IntroSequenceRefs, ParticleGroup, RabbitSnapshot } from "../../types.ts";


type UseParticleGroupsReturn = (
    shot: RabbitSnapshot | null,
    rabbitCanvas: HTMLCanvasElement | null
) => ParticleGroup[];

const useParticleGroups = (refs: IntroSequenceRefs, { firstName, lastName }: IntroNames): UseParticleGroupsReturn => {
    const store = useIntroStage();
    const wordGroups = useWordGroups();
    const rabbitGroup = useRabbitGroup();

    return useCallback((shot, rabbitCanvas) => {
        const [firstDelay, lastDelay] = WORD_FLIGHT_DELAYS;
        const words = wordGroups([
            { element: refs.firstWord.current, word: firstName, delay: firstDelay },
            { element: refs.lastWord.current, word: lastName, delay: lastDelay },
        ], store?.getTarget("title") ?? null);
        const rabbit = rabbitGroup(shot, refs.snapshot.current, rabbitCanvas);

        return rabbit ? [...words, rabbit] : words;
    }, [refs, firstName, lastName, store, wordGroups, rabbitGroup]);
};

export { useParticleGroups };
export type { UseParticleGroupsReturn };
