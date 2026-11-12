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
        "animate-intro-reveal [animation-delay:360ms]",
        "animate-intro-reveal [animation-delay:720ms]",
        "animate-intro-reveal [animation-delay:1080ms]",
    ] as const);
    const { phase, isStaggered } = useIntroSnapshot();

    const isHidden = useMemo(() => {
        return ["load", "type", "morph"].includes(phase);
    }, [phase]);
    const isRevealing = useMemo(() => {
        return (
            phase === "fly" ||
            phase === "settle" ||
            (phase === "done" && isStaggered)
        );
    }, [phase, isStaggered]);

    return (
        <RegisterAnimation
            id="intro-visibility"
            className={cn(
                isHidden && "opacity-0 animate-intro-unhide",
                isRevealing && STAGGER_CLASSES.current[order]
            )}
        />
    );
}

export { IntroReveal };
export type { IntroRevealProps };
