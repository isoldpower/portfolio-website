import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";


function CheckpointHover() {
    return (
        <RegisterAnimation
            id="checkpoint-hover"
            className={cn(
                "[&_[data-label]]:transition-[letter-spacing,color] [&_[data-label]]:duration-200",
                "[&_[data-label]]:ease-[steps(3)]",
                "[&:is(:hover,:focus-visible)_[data-label]]:tracking-[2px]",
                "[&:is(:hover,:focus-visible)_[data-label]]:text-highlight",
                "[&:is(:hover,:focus-visible)_[data-label]]:opacity-100",
                "[&:is(:hover,:focus-visible)_[data-preview]]:opacity-100",
                "[&:is(:hover,:focus-visible)_[data-caret]]:opacity-100",
                "[&:is(:hover,:focus-visible)_[data-caret]]:animate-[blink_0.8s_steps(1)_infinite]",
                "motion-safe:[&:is(:hover,:focus-visible)_[data-flag]]:animate-journey-hop"
            )}
        />
    );
}

export { CheckpointHover };
