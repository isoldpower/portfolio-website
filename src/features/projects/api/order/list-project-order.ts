import type { ProjectApiClient } from "../types.ts";


interface ProjectOrderDto {
    slug: string;
    title: string;
}

interface ListProjectOrderOptions {
    client: ProjectApiClient;
}

type ListProjectOrderResponse = ProjectOrderDto[];

const PROJECT_ORDER_QUERY = `*[_type == "project" && defined(slug.current)]
    | order(select(favorite == true => coalesce(journey.order, 999), 1000) asc, _createdAt desc){
    "slug": slug.current,
    title
}`;

const listProjectOrder = async ({ client }: ListProjectOrderOptions): Promise<ListProjectOrderResponse> => {
    return client.fetch<ListProjectOrderResponse>(PROJECT_ORDER_QUERY);
};

export { listProjectOrder };
export type { ListProjectOrderOptions, ListProjectOrderResponse, ProjectOrderDto };
