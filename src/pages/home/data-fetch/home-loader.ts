import { listProjectsPreviews, mapProjectPreview } from "@features/projects/api";

import type { ProjectApiServers } from "@features/projects/api";


interface HomeLoaderParams {
    context: {
        apiServers: ProjectApiServers;
    };
}

async function homePageLoader({ context }: HomeLoaderParams) {
    const projects = await listProjectsPreviews({
        client: context.apiServers.projectApi,
        order: "desc"
    });

    return { projects: projects.map(mapProjectPreview) };
}

export { homePageLoader };
export type { HomeLoaderParams };
