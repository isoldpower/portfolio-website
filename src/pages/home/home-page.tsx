import { PortfolioSection } from "@processes/projects/portfolio-section";
import { ProjectBrowserSection } from "@processes/projects/project-browser-section";
import { AboutSection } from "@processes/site-artwork/about-section";
import { ContactsSection } from "@processes/site-artwork/contacts-section";
import { ExperienceSection } from "@processes/site-artwork/experience-section";
import { HeroSection } from "@processes/site-artwork/hero-section";

import type { HomePageData } from "@pages/home/types.ts";
import type { ClientLayoutPage } from "@shared/lib/types";


const HomePage: ClientLayoutPage<HomePageData> = ({
    about,
    experience,
    journey,
    projects,
    contacts,
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
            {projects.length > 0 && (
                <ProjectBrowserSection projects={projects} />
            )}
            {contacts.length > 0 && (
                <ContactsSection contacts={contacts} />
            )}
        </>
    );
}

export { HomePage };
