import type { AboutApiClient, AboutProfileDto } from "../types.ts";


interface GetAboutProfileOptions {
    client: AboutApiClient;
}

type GetAboutProfileResponse = AboutProfileDto | null;

const ABOUT_PROFILE_QUERY = `*[_id == "about_profile"][0]{
    "portrait": portrait {
        alt,
        "asset": asset-> {
            url,
            "width": metadata.dimensions.width,
            "height": metadata.dimensions.height
        }
    },
    description,
    "variables": variables[] { _key, type, name, value },
    note
}`;

const getAboutProfile = async ({ client }: GetAboutProfileOptions): Promise<GetAboutProfileResponse> => {
    return client.fetch<GetAboutProfileResponse>(ABOUT_PROFILE_QUERY);
};

export { getAboutProfile };
export type { GetAboutProfileOptions, GetAboutProfileResponse };
