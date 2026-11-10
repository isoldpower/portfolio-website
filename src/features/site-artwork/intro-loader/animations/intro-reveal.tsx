import { useMemo, useRef } from "react";
import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";
import { useIntroSnapshot } from "../stage/use-intro-snapshot.ts";


interface IntroRevealProps {
    order: 0 | 1 | 2 | 3;
}

function IntroReveal({ order }: IntroRevealProps) {
    const STAGGER_CLASSES = useRef([
        "animate-intro-reveal [animation-delay:0ms]",
        "animate-intro-reveal [animation-delay:130ms]",
        "animate-intro-reveal [animation-delay:260ms]",
        "animate-intro-reveal [animation-delay:390ms]",
    ] as const);
    const { phase, isStaggered } = useIntroSnapshot();
    const isDone = useMemo(() => {
        return phase !== "done";
    }, [phase]);

    return (
        <RegisterAnimation
            id="intro-visibility"
            className={cn(
                !isDone && "opacity-0 animate-intro-unhide",
                isDone && isStaggered && STAGGER_CLASSES.current[order]
            )}
        />
    );
}

export { IntroReveal };
export type { IntroRevealProps };
