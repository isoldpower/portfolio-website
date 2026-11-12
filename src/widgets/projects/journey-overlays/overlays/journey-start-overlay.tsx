import { JourneyButton } from "@entities/projects/journey-button";
import { JourneyOverlay } from "@entities/projects/journey-overlay";
import { JourneyButtonHover } from "@features/projects/journey-animations";
import { useJourney, useJourneyOverlay } from "@features/projects/journey-scroll";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { AnimationComposer } from "@shared/lib/components";
import {useCallback} from "react";


function JourneyStartOverlay() {
    const { jumpToStop } = useJourney();
    const { titleText, noteText, actionText, isInteractive } = useJourneyOverlay("start");

    const handleStartOver = useCallback(() => {
        jumpToStop(0);
    }, [jumpToStop]);

    return (
        <JourneyOverlay kind="start" isInteractive={isInteractive}>
            <JourneyOverlay.Title>
                {titleText}
            </JourneyOverlay.Title>
            <AnimationComposer>
                <FocusOutline />
                <JourneyButtonHover />
                <JourneyButton
                    as="button"
                    type="button"
                    className="text-sm"
                    onClick={handleStartOver}
                >
                    {actionText}
                </JourneyButton>
            </AnimationComposer>
            <JourneyOverlay.Note>
                {noteText}
            </JourneyOverlay.Note>
        </JourneyOverlay>
    );
}

export { JourneyStartOverlay };
