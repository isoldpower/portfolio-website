import { useTranslation } from "react-i18next";

import { JourneyStage } from "@entities/projects/journey-stage";
import { useJourney } from "@features/projects/journey-scroll";
import { JourneyCheckpoints } from "@widgets/projects/journey-checkpoints";
import { JourneyHud } from "@widgets/projects/journey-hud";
import { JourneyOverlays } from "@widgets/projects/journey-overlays";
import { JourneyProjects } from "@widgets/projects/journey-projects";
import { JourneyScenery } from "@widgets/projects/journey-scenery";


function PortfolioStage() {
    const { t } = useTranslation();
    const { stageRef } = useJourney();

    return (
        <JourneyStage ref={stageRef} aria-label={t("journey.region_label")}>
            <JourneyStage.Shade />
            <JourneyScenery />
            <JourneyHud />
            <JourneyCheckpoints />
            <JourneyProjects />
            <JourneyOverlays />
        </JourneyStage>
    );
}

export { PortfolioStage };
