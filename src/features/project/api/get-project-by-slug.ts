import { sanityClient } from "@app/sanity-cms";

import {
    commonProjectFields,
    kindSpecificFields,
    sourceRepoProjection
} from "./projections.ts";

import type { ProjectDetails } from "@entities/project";


interface GetProjectBySlugOptions {
    slug: string;
}

type GetProjectBySlugResponse = ProjectDetails | null;

const getProjectBySlug = async ({
    slug
}: GetProjectBySlugOptions): Promise<GetProjectBySlugResponse> => {
    // The slug comes from the URL, so it goes in as a parameter, never into the query text.
    const sourceChunk = "*[_type == \"project\" && slug.current == $slug][0]";
    const requestedFields = [
        ...commonProjectFields,
        `"sourceRepos": coalesce(source_repos[]->${sourceRepoProjection}, [])`,
        ...kindSpecificFields,
    ];

    return sanityClient.fetch<GetProjectBySlugResponse>(
        `${sourceChunk}{${requestedFields.join(", ")}}`,
        { slug }
    );
};

export { getProjectBySlug };
export type { GetProjectBySlugOptions, GetProjectBySlugResponse };
