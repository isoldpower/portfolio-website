import { SectionLabel } from "@entities/site-artwork/section-label";
import { CursorBlink } from "@features/site-artwork/cursor-blink";
import { RuleDraw, useSectionLabelReveal } from "@features/site-artwork/section-label-reveal";
import { AnimationComposer } from "@shared/lib/components";


interface SectionHeadingProps {
    text: string;
}

function SectionHeading({ text }: SectionHeadingProps) {
    const { ref, typedLength, isTyping, isRevealed } = useSectionLabelReveal({ text });

    return (
        <SectionLabel ref={ref}>
            <SectionLabel.Title text={text} typedLength={typedLength}>
                {isTyping && (
                    <AnimationComposer>
                        <CursorBlink />
                        <SectionLabel.TypingCursor />
                    </AnimationComposer>
                )}
            </SectionLabel.Title>
            <AnimationComposer>
                <RuleDraw />
                <SectionLabel.Rule isDrawn={isRevealed} />
            </AnimationComposer>
        </SectionLabel>
    );
}

export { SectionHeading };
export type { SectionHeadingProps };
