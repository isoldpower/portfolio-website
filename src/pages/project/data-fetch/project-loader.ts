import { notFound } from "@tanstack/react-router";

import { getProjectBySlug } from "@features/project/api";

import type { ProjectPageData } from "../types.ts";


interface ProjectLoaderParams {
    params: {
        slug: string;
    }
}

async function projectPageLoader({ params }: ProjectLoaderParams): Promise<ProjectPageData> {
    const project = await getProjectBySlug({
        slug: params.slug
    });

    if (project === null) {
        throw notFound();
    }

    return { project };
}

export { projectPageLoader };
export type { ProjectLoaderParams };
