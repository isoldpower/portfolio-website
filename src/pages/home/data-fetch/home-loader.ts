import { listProjectsPreviews, mapProjectPreview } from "@features/project/api";

import type { ProjectApiServers } from "@features/project/api";


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
