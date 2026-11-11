import type { ExperienceApiClient, ExperienceSectionDto } from "../types.ts";


interface GetExperienceSectionOptions {
    client: ExperienceApiClient;
}

type GetExperienceSectionResponse = ExperienceSectionDto | null;

const EXPERIENCE_SECTION_QUERY = `*[_id == "experience_section"][0]{
    "entries": entries[] { _key, kind, title, organization, start_year, end_year, description },
    "video_url": video.asset->url
}`;

const getExperienceSection = async ({
    client
}: GetExperienceSectionOptions): Promise<GetExperienceSectionResponse> => {
    return client.fetch<GetExperienceSectionResponse>(EXPERIENCE_SECTION_QUERY);
};

export { getExperienceSection };
export type { GetExperienceSectionOptions, GetExperienceSectionResponse };
