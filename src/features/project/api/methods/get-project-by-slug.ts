import {
    commonProjectFields,
    kindSpecificFields,
    sourceRepoProjection
} from "../request-templates.ts";

import type { ProjectApiClient, ProjectDetailsDto } from "../types.ts";


interface GetProjectBySlugOptions {
    client: ProjectApiClient;
    slug: string;
}

type GetProjectBySlugResponse = ProjectDetailsDto | null;

const getProjectBySlug = async ({
    client,
    slug
}: GetProjectBySlugOptions): Promise<GetProjectBySlugResponse> => {
    const sourceChunk = "*[_type == \"project\" && slug.current == $slug][0]";
    const requestedFields = [
        ...commonProjectFields,
        `"source_repos": source_repos[]->${sourceRepoProjection}`,
        ...kindSpecificFields,
    ];

    return client.fetch<GetProjectBySlugResponse>(
        `${sourceChunk}{${requestedFields.join(", ")}}`,
        { slug }
    );
};

export { getProjectBySlug };
export type { GetProjectBySlugOptions, GetProjectBySlugResponse };
