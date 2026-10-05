import { sanityClient } from "@app/sanity-cms";

import { commonProjectFields } from "./projections.ts";

import type { ProjectPreview } from "@entities/project/model";


interface ListProjectsPreviewsOptions {
    order?: "asc" | "desc";
}

type ListProjectsPreviewsResponse = ProjectPreview[];

const listProjectsPreviews = async ({
    order = "desc"
}: ListProjectsPreviewsOptions = {}): Promise<ListProjectsPreviewsResponse> => {
    const sourceChunk = "*[_type == \"project\" && defined(slug.current)]";
    const orderChunk = `order(_createdAt ${order})`;

    return sanityClient.fetch<ListProjectsPreviewsResponse>(
        `${sourceChunk}|${orderChunk}{${commonProjectFields.join(", ")}}`
    );
};

export { listProjectsPreviews };
export type { ListProjectsPreviewsOptions, ListProjectsPreviewsResponse };
