import { listProjectCards, mapProjectCard } from "@features/projects/api";
import { listFavoriteProjects, mapPortfolioJourney } from "@features/projects/portfolio-journey";
import { getAboutProfile, mapAboutProfile } from "@features/site-artwork/about-profile";
import { listContacts, mapContacts } from "@features/site-artwork/contacts";
import { getExperienceSection, mapExperienceSection } from "@features/site-artwork/experience-section";

import type { ProjectApiServers } from "@features/projects/api";
import type { JourneyApiServers } from "@features/projects/portfolio-journey";
import type { AboutApiServers } from "@features/site-artwork/about-profile";
import type { ContactsApiServers } from "@features/site-artwork/contacts";
import type { ExperienceApiServers } from "@features/site-artwork/experience-section";


interface HomeLoaderParams {
    context: {
        apiServers: ProjectApiServers & AboutApiServers & ExperienceApiServers & JourneyApiServers & ContactsApiServers;
    };
}

async function homePageLoader({ context }: HomeLoaderParams) {
    const [projects, about, experience, journey, contacts] = await Promise.all([
        listProjectCards({ client: context.apiServers.projectApi }),
        getAboutProfile({ client: context.apiServers.aboutApi }),
        getExperienceSection({ client: context.apiServers.experienceApi }),
        listFavoriteProjects({ client: context.apiServers.journeyApi }),
        listContacts({ client: context.apiServers.contactsApi }),
    ]);

    return {
        projects: projects.map(mapProjectCard),
        about: about ? mapAboutProfile(about) : null,
        experience: experience ? mapExperienceSection(experience) : null,
        journey: mapPortfolioJourney(journey),
        contacts: mapContacts(contacts),
    };
}

export { homePageLoader };
export type { HomeLoaderParams };
