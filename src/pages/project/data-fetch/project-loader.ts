import { notFound } from "@tanstack/react-router";
import { getProjectBySlug,  listProjectOrder,  mapProjectDetails, mapProjectNeighbors } from "@features/projects/api";

import type { ProjectPageData } from "../types.ts";
import type { ProjectApiServers } from "@features/projects/api";


interface ProjectLoaderParams {
    params: {
        slug: string;
    };
    context: {
        apiServers: ProjectApiServers;
    };
}

async function projectPageLoader({ params, context }: ProjectLoaderParams): Promise<ProjectPageData> {
    const [project, projectOrder] = await Promise.all([
        getProjectBySlug({ client: context.apiServers.projectApi, slug: params.slug }),
        listProjectOrder({ client: context.apiServers.projectApi }),
    ]);

    if (project === null) {
        throw notFound();
    }

    return {
        project: mapProjectDetails(project),
        neighbors: mapProjectNeighbors(projectOrder, params.slug),
    };
}

export { projectPageLoader };
export type { ProjectLoaderParams };
