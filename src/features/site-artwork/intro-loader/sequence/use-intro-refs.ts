import { useMemo, useRef } from "react";

import type { IntroSequenceRefs } from "../types.ts";


type UseIntroRefsReturn = IntroSequenceRefs;

const useIntroRefs = (): UseIntroRefsReturn => {
    const screen = useRef<HTMLDivElement>(null);
    const firstWord = useRef<HTMLSpanElement>(null);
    const lastWord = useRef<HTMLSpanElement>(null);
    const gloss = useRef<HTMLSpanElement>(null);
    const snapshot = useRef<HTMLImageElement>(null);
    const particles = useRef<HTMLCanvasElement>(null);

    return useMemo(() => ({
        screen,
        firstWord,
        lastWord,
        gloss,
        snapshot,
        particles
    }), []);
};

export { useIntroRefs };
export type { UseIntroRefsReturn };
