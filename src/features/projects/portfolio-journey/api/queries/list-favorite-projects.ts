import { MAX_JOURNEY_STOPS } from "@entities/projects/model";

import type { FavoriteProjectsDto, JourneyApiClient } from "../types.ts";


interface ListFavoriteProjectsOptions {
    client: JourneyApiClient;
}

type ListFavoriteProjectsResponse = FavoriteProjectsDto;

const FAVORITE_PROJECTS_QUERY = `*[
    _type == "project" && favorite == true && defined(journey.scenery) && defined(slug.current)
] | order(coalesce(journey.order, 999) asc, _createdAt asc)[0...$limit]{
    _id,
    title,
    "slug": slug.current,
    "repo_tech": source_repos[]->{ "titles": tech_stack[]->title },
    "extra_tech": extra_tech[]->title,
    "journey": journey {
        scenery,
        location_title,
        checkpoint,
        description,
        "screenshots": screenshots[] {
            _key,
            label,
            alt,
            "url": asset->url,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
        }
    }
}`;

const listFavoriteProjects = async ({
    client
}: ListFavoriteProjectsOptions): Promise<ListFavoriteProjectsResponse> => {
    return client.fetch<ListFavoriteProjectsResponse>(FAVORITE_PROJECTS_QUERY, {
        limit: MAX_JOURNEY_STOPS
    });
};

export { listFavoriteProjects };
export type { ListFavoriteProjectsOptions, ListFavoriteProjectsResponse };
