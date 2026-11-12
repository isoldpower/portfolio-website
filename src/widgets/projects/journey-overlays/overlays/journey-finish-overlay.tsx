import { JourneyButton } from "@entities/projects/journey-button";
import { JourneyOverlay } from "@entities/projects/journey-overlay";
import { JourneyButtonHover } from "@features/projects/journey-animations";
import { useJourney, useJourneyOverlay } from "@features/projects/journey-scroll";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { AnimationComposer } from "@shared/lib/components";


function JourneyFinishOverlay() {
    const { skipTargetHref } = useJourney();
    const { titleText, noteText, actionText, isInteractive } = useJourneyOverlay("finish");

    return (
        <JourneyOverlay kind="finish" isInteractive={isInteractive}>
            <JourneyOverlay.Title>
                {titleText}
            </JourneyOverlay.Title>
            <AnimationComposer>
                <FocusOutline />
                <JourneyButtonHover />
                <JourneyButton as="a" href={skipTargetHref} className="text-sm">
                    {actionText}
                </JourneyButton>
            </AnimationComposer>
            <JourneyOverlay.Note>
                {noteText}
            </JourneyOverlay.Note>
        </JourneyOverlay>
    );
}

export { JourneyFinishOverlay };
