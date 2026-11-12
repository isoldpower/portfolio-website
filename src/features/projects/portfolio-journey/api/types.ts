import type { SanityClient } from "@sanity/client";
import type { LocalizedValue } from "@shared/lib/i18n";


type JourneyApiClient = Pick<SanityClient, "fetch">;

interface JourneyApiServers {
    journeyApi: JourneyApiClient;
}

interface JourneyScreenshotDto {
    _key: string;
    label: string | null;
    alt: LocalizedValue | null;
    url: string | null;
    width: number | null;
    height: number | null;
}

interface FavoriteProjectDto {
    _id: string;
    title: string;
    slug: string | null;
    repo_tech: { titles: (string | null)[] | null }[] | null;
    extra_tech: (string | null)[] | null;
    journey: {
        scenery: string | null;
        location_title: string | null;
        checkpoint: string | null;
        description: LocalizedValue | null;
        screenshots: JourneyScreenshotDto[] | null;
    } | null;
}

type FavoriteProjectsDto = FavoriteProjectDto[];

export type { FavoriteProjectDto, FavoriteProjectsDto, JourneyApiClient, JourneyApiServers, JourneyScreenshotDto };
