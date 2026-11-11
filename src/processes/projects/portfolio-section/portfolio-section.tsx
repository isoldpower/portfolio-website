import { useTranslation } from "react-i18next";

import { PortfolioBody } from "@entities/projects/portfolio-body";
import { JourneyProvider } from "@features/projects/journey-scroll";
import { SectionHeading } from "@widgets/site-artwork/section-heading";

import { SKIP_TARGET, SKIP_TARGET_ID } from "./constants.ts";
import { PortfolioStage } from "./stage/portfolio-stage.tsx";

import type { PortfolioJourney } from "@entities/projects/model";


interface PortfolioSectionProps {
    journey: PortfolioJourney;
}

function PortfolioSection({ journey }: PortfolioSectionProps) {
    const { t } = useTranslation();

    return (
        <JourneyProvider journeyStops={journey.stops} skipTargetHref={SKIP_TARGET}>
            <PortfolioBody id="portfolio" className="mt-20 md:mt-24">
                <PortfolioBody.Header>
                    <SectionHeading text={t("journey.label")} />
                </PortfolioBody.Header>
                <PortfolioBody.Stage>
                    <PortfolioStage />
                </PortfolioBody.Stage>
                <PortfolioBody.Anchor id={SKIP_TARGET_ID} />
            </PortfolioBody>
        </JourneyProvider>
    );
}

export { PortfolioSection };
export type { PortfolioSectionProps };
