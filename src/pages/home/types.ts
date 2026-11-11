import type { PortfolioJourney, ProjectPreview } from "@entities/projects/model";
import type { AboutProfile, ExperienceSection } from "@entities/site-artwork/model";


interface HomePageData {
    projects: ProjectPreview[];
    about: AboutProfile | null;
    experience: ExperienceSection | null;
    journey: PortfolioJourney;
}

export type { HomePageData };
