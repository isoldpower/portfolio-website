import type { SanityClient } from "@sanity/client";
import type { LocalizedValue } from "@shared/lib/i18n";


type AboutApiClient = Pick<SanityClient, "fetch">;

interface AboutApiServers {
    aboutApi: AboutApiClient;
}

interface AboutPortraitDto {
    alt: LocalizedValue | null;
    asset: {
        url: string;
        width: number;
        height: number;
    } | null;
}

interface AboutVariableDto {
    _key: string;
    type: string;
    name: string;
    value: LocalizedValue | null;
}

interface AboutProfileDto {
    portrait: AboutPortraitDto | null;
    description: LocalizedValue | null;
    variables: AboutVariableDto[] | null;
    note: LocalizedValue | null;
}

export type { AboutApiClient, AboutApiServers, AboutPortraitDto, AboutProfileDto, AboutVariableDto };
