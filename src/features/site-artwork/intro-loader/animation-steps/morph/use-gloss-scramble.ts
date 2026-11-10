import { useCallback } from "react";

import { SCRAMBLE_BASE_KEEP, SCRAMBLE_GLYPHS, SCRAMBLE_STEPS, SCRAMBLE_STEP_MS } from "../../constants.ts";
import { useIntroScene } from "../../scene/use-intro-scene.ts";
import { useTicker } from "../../sequence/use-ticker.ts";



type UseGlossScrambleReturn = () => Promise<void>;

const useGlossScramble = (text: string): UseGlossScrambleReturn => {
    const { scene } = useIntroScene();
    const tick = useTicker();

    const randomGlyph = useCallback((): string => {
        return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
    }, []);

    const scramble = useCallback((level: number): string => {
        const keepChance = level / SCRAMBLE_STEPS + SCRAMBLE_BASE_KEEP;
        return text.split("").map((character) => {
            return character === " " || Math.random() > keepChance ? character : randomGlyph();
        }).join("");
    }, [text, randomGlyph]);

    const scrambleDelay = useCallback((): number => {
        return SCRAMBLE_STEP_MS;
    }, []);

    return useCallback(() => {
        return tick({
            count: SCRAMBLE_STEPS,
            isAlive: scene.isAlive,
            onTick: (level) => {
                scene.updateView({ gloss: scramble(level) });
            },
            delay: scrambleDelay,
        });
    }, [scene, tick, scramble, scrambleDelay]);
};

export { useGlossScramble };
export type { UseGlossScrambleReturn };
