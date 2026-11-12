import type { ProjectApiClient } from "../types.ts";
import type { ProjectCardDto } from "./types.ts";


interface ListProjectCardsOptions {
    client: ProjectApiClient;
}

type ListProjectCardsResponse = ProjectCardDto[];

const PROJECT_CARDS_QUERY = `*[_type == "project" && defined(slug.current)]
    | order(select(favorite == true => coalesce(journey.order, 999), 1000) asc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    kind,
    summary,
    "journey_description": journey.description,
    "repo_tech": source_repos[]->tech_stack[]->title,
    "extra_tech": extra_tech[]->title,
    "image": coalesce(journey.screenshots[0], photos[0]) {
        alt,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
    }
}`;

const listProjectCards = async ({ client }: ListProjectCardsOptions): Promise<ListProjectCardsResponse> => {
    return client.fetch<ListProjectCardsResponse>(PROJECT_CARDS_QUERY);
};

export { listProjectCards };
export type { ListProjectCardsOptions, ListProjectCardsResponse };
