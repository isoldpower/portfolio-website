import { commonProjectFields } from "../request-templates.ts";

import type { ProjectApiClient, ProjectPreviewDto } from "../types.ts";


interface ListProjectsPreviewsOptions {
    client: ProjectApiClient;
    order?: "asc" | "desc";
}

type ListProjectsPreviewsResponse = ProjectPreviewDto[];

const listProjectsPreviews = async ({
    client,
    order = "desc"
}: ListProjectsPreviewsOptions): Promise<ListProjectsPreviewsResponse> => {
    const sourceChunk = "*[_type == \"project\" && defined(slug.current)]";
    const orderChunk = `order(_createdAt ${order})`;

    return client.fetch<ListProjectsPreviewsResponse>(
        `${sourceChunk}|${orderChunk}{${commonProjectFields.join(", ")}}`
    );
};

export { listProjectsPreviews };
export type { ListProjectsPreviewsOptions, ListProjectsPreviewsResponse };
