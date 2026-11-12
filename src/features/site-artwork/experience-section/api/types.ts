import type { SanityClient } from "@sanity/client";
import type { LocalizedValue } from "@shared/lib/i18n";


type ExperienceApiClient = Pick<SanityClient, "fetch">;

interface ExperienceApiServers {
    experienceApi: ExperienceApiClient;
}

interface ExperienceEntryDto {
    _key: string;
    kind: string | null;
    title: LocalizedValue | null;
    organization: LocalizedValue | null;
    start_year: number | null;
    end_year: number | null;
    description: LocalizedValue | null;
}

interface ExperienceSectionDto {
    entries: ExperienceEntryDto[] | null;
    video_url: string | null;
}

export type { ExperienceApiClient, ExperienceApiServers, ExperienceEntryDto, ExperienceSectionDto };
