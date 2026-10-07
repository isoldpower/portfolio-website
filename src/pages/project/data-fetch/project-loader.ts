import { notFound } from "@tanstack/react-router";

import { getProjectBySlug, mapProjectDetails } from "@features/project/api";

import type { ProjectPageData } from "../types.ts";
import type { ProjectApiServers } from "@features/project/api";


interface ProjectLoaderParams {
    params: {
        slug: string;
    };
    context: {
        apiServers: ProjectApiServers;
    };
}

async function projectPageLoader({ params, context }: ProjectLoaderParams): Promise<ProjectPageData> {
    const project = await getProjectBySlug({
        client: context.apiServers.projectApi,
        slug: params.slug
    });

    if (project === null) {
        throw notFound();
    }

    return {
        project: mapProjectDetails(project),
    };
}

export { projectPageLoader };
export type { ProjectLoaderParams };
