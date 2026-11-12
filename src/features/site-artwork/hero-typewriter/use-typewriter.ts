import { useCallback, useEffect, useMemo, useState } from "react";


interface UseTypewriterParams {
    words: readonly string[];
    typeMs?: number;
    eraseMs?: number;
    holdMs?: number;
}

interface UseTypewriterReturn {
    text: string;
    activeIndex: number;
}

const START_DELAY_MS = 400;
const NEXT_WORD_DELAY_MS = 300;
const TYPE_JITTER_MS = 45;
const REDUCED_MOTION_HOLD_FACTOR = 1.6;

const useTypewriter = ({
    words,
    typeMs = 75,
    eraseMs = 38,
    holdMs = 1700
}: UseTypewriterParams): UseTypewriterReturn => {
    const [text, setText] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const wordsKey = useMemo(() => words.join("|"), [words]);

    const runCycle = useCallback((schedule: (callback: () => void, delay: number) => void) => {
        const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let index = 0;

        if (isReducedMotion) {
            setText(words[0] ?? "");
            const swap = () => {
                index = (index + 1) % words.length;
                setActiveIndex(index);
                setText(words[index]);
                schedule(swap, holdMs * REDUCED_MOTION_HOLD_FACTOR);
            };
            schedule(swap, holdMs * REDUCED_MOTION_HOLD_FACTOR);
            return;
        }

        const erase = (word: string, length: number) => {
            setText(word.slice(0, length));
            if (length > 0) {
                schedule(() => { erase(word, length - 1); }, eraseMs);
                return;
            }

            index = (index + 1) % words.length;
            setActiveIndex(index);
            schedule(() => { type(words[index], 1); }, NEXT_WORD_DELAY_MS);
        };

        const type = (word: string, length: number) => {
            setText(word.slice(0, length));
            if (length < word.length) {
                schedule(() => { type(word, length + 1); }, typeMs + Math.random() * TYPE_JITTER_MS);
                return;
            }

            schedule(() => { erase(word, word.length - 1); }, holdMs);
        };

        schedule(() => { type(words[0], 1); }, START_DELAY_MS);
    }, [words, typeMs, eraseMs, holdMs]);

    useEffect(() => {
        if (words.length === 0) {
            return;
        }

        let timer: ReturnType<typeof setTimeout> | undefined;
        let isAlive = true;

        runCycle((callback, delay) => {
            timer = setTimeout(() => {
                if (isAlive) {
                    callback();
                }
            }, delay);
        });

        return () => {
            isAlive = false;
            clearTimeout(timer);
        };
    }, [wordsKey, runCycle, words.length]);

    return useMemo(() => ({ text, activeIndex }), [text, activeIndex]);
};

export { useTypewriter };
export type { UseTypewriterParams, UseTypewriterReturn };
