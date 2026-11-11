import { listProjectsPreviews, mapProjectPreview } from "@features/projects/api";
import { listFavoriteProjects, mapPortfolioJourney } from "@features/projects/portfolio-journey";
import { getAboutProfile, mapAboutProfile } from "@features/site-artwork/about-profile";
import { getExperienceSection, mapExperienceSection } from "@features/site-artwork/experience-section";

import type { ProjectApiServers } from "@features/projects/api";
import type { JourneyApiServers } from "@features/projects/portfolio-journey";
import type { AboutApiServers } from "@features/site-artwork/about-profile";
import type { ExperienceApiServers } from "@features/site-artwork/experience-section";


interface HomeLoaderParams {
    context: {
        apiServers: ProjectApiServers & AboutApiServers & ExperienceApiServers & JourneyApiServers;
    };
}

async function homePageLoader({ context }: HomeLoaderParams) {
    const [projects, about, experience, journey] = await Promise.all([
        listProjectsPreviews({ client: context.apiServers.projectApi, order: "desc" }),
        getAboutProfile({ client: context.apiServers.aboutApi }),
        getExperienceSection({ client: context.apiServers.experienceApi }),
        listFavoriteProjects({ client: context.apiServers.journeyApi }),
    ]);

    return {
        projects: projects.map(mapProjectPreview),
        about: about ? mapAboutProfile(about) : null,
        experience: experience ? mapExperienceSection(experience) : null,
        journey: mapPortfolioJourney(journey),
    };
}

export { homePageLoader };
export type { HomeLoaderParams };
