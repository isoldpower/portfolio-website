import type { PortfolioJourney, ProjectCard } from "@entities/projects/model";
import type { AboutProfile, ContactEntry, ExperienceSection } from "@entities/site-artwork/model";


interface HomePageData {
    projects: ProjectCard[];
    about: AboutProfile | null;
    experience: ExperienceSection | null;
    journey: PortfolioJourney;
    contacts: ContactEntry[];
}

export type { HomePageData };
