import { useTranslation } from "react-i18next";

import { JourneyStage } from "@entities/projects/journey-stage";
import { SkipLinkHover } from "@features/projects/journey-animations";
import { useJourney, useJourneyHud } from "@features/projects/journey-scroll";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { AnimationComposer } from "@shared/lib/components";


function JourneyHud() {
    const { t } = useTranslation();
    const { skipTargetHref } = useJourney();
    const { statusText, hintText } = useJourneyHud();

    return (
        <>
            <JourneyStage.Header>
                <JourneyStage.Player>
                    {t("journey.player")}
                </JourneyStage.Player>
                <JourneyStage.Status>
                    {statusText}
                </JourneyStage.Status>
            </JourneyStage.Header>
            <JourneyStage.Footer>
                <JourneyStage.Hint>
                    {hintText}
                </JourneyStage.Hint>
                <AnimationComposer>
                    <SkipLinkHover />
                    <FocusOutline />
                    <JourneyStage.SkipLink href={skipTargetHref}>
                        {t("journey.skip")}
                    </JourneyStage.SkipLink>
                </AnimationComposer>
            </JourneyStage.Footer>
        </>
    );
}

export { JourneyHud };
