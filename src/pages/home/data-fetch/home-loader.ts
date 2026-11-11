import { listProjectsPreviews, mapProjectPreview } from "@features/projects/api";
import { getAboutProfile, mapAboutProfile } from "@features/site-artwork/about-profile";

import type { ProjectApiServers } from "@features/projects/api";
import type { AboutApiServers } from "@features/site-artwork/about-profile";


interface HomeLoaderParams {
    context: {
        apiServers: ProjectApiServers & AboutApiServers;
    };
}

async function homePageLoader({ context }: HomeLoaderParams) {
    const [projects, about] = await Promise.all([
        listProjectsPreviews({ client: context.apiServers.projectApi, order: "desc" }),
        getAboutProfile({ client: context.apiServers.aboutApi }),
    ]);

    return {
        projects: projects.map(mapProjectPreview),
        about: about ? mapAboutProfile(about) : null,
    };
}

export { homePageLoader };
export type { HomeLoaderParams };
