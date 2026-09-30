import { notFound } from "@tanstack/react-router";

import { getProjectBySlug } from "@features/project";

import type { ProjectDetails } from "@entities/project";


interface ProjectLoaderParams {
    slug: string;
}

async function projectPageLoader({ slug }: ProjectLoaderParams): Promise<ProjectDetails> {
    const project = await getProjectBySlug({ slug });

    if (project === null) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw notFound();
    }

    return project;
}

export { projectPageLoader };
export type { ProjectLoaderParams };
