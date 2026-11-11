import { useCallback, useEffect, useRef, useState } from "react";
import { TYPE_JITTER_MS, CURSOR_HOLD_MS, START_DELAY_MS, VISIBLE_THRESHOLD } from './config.ts';

import type { RefCallback } from "react";


interface UseSectionLabelRevealParams {
    text: string;
    typeMs?: number;
}

interface UseSectionLabelRevealReturn {
    ref: RefCallback<HTMLElement>;
    typedLength: number;
    isTyping: boolean;
    isRevealed: boolean;
}

const useSectionLabelReveal = ({
    text,
    typeMs = 28
}: UseSectionLabelRevealParams): UseSectionLabelRevealReturn => {
    const [element, setElement] = useState<HTMLElement | null>(null);
    const [typedLength, setTypedLength] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const ref: RefCallback<HTMLElement> = useCallback((node) => {
        setElement(node);
    }, []);
    const typeFrom = useCallback((length: number) => {
        setTypedLength(length);

        if (length < text.length) {
            timer.current = setTimeout(() => {
                typeFrom(length + 1);
            }, typeMs + Math.random() * TYPE_JITTER_MS);
        } else {
            timer.current = setTimeout(() => {
                setIsTyping(false);
            }, CURSOR_HOLD_MS);
        }
    }, [text, typeMs]);

    const reveal = useCallback(() => {
        setIsRevealed(true);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setTypedLength(text.length);
        } else {
            setIsTyping(true);
            timer.current = setTimeout(() => {
                typeFrom(1);
            }, START_DELAY_MS);
        }
    }, [text, typeFrom]);

    useEffect(() => {
        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry?.isIntersecting) {
                return;
            }

            observer.disconnect();
            reveal();
        }, { threshold: VISIBLE_THRESHOLD });

        observer.observe(element);
        return () => {
            observer.disconnect();
            clearTimeout(timer.current);
        };
    }, [element, reveal]);

    return { ref, typedLength, isTyping, isRevealed };
};

export { useSectionLabelReveal };
export type { UseSectionLabelRevealParams, UseSectionLabelRevealReturn };
