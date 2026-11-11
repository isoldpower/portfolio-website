import { PortfolioSection } from "@processes/projects/portfolio-section";
import { AboutSection } from "@processes/site-artwork/about-section";
import { ExperienceSection } from "@processes/site-artwork/experience-section";
import { HeroSection } from "@processes/site-artwork/hero-section";

import type { HomePageData } from "@pages/home/types.ts";
import type { ClientLayoutPage } from "@shared/lib/types";


const HomePage: ClientLayoutPage<HomePageData> = ({
    about,
    experience,
    journey,
}) => {
    return (
        <>
            <HeroSection />
            {about && (
                <AboutSection profile={about} />
            )}
            {experience && (
                <ExperienceSection section={experience} />
            )}
            {journey.stops.length > 0 && (
                <PortfolioSection journey={journey} />
            )}
        </>
    );
}

export { HomePage };
