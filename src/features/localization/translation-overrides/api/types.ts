import type { SanityClient } from "@sanity/client";


type TranslationApiClient = Pick<SanityClient, "fetch">;

interface TranslationApiServers {
    translationApi: TranslationApiClient;
}

interface UiTranslationsDto {
    locale: string;
    code: string | null;
}

export type { TranslationApiClient, TranslationApiServers, UiTranslationsDto };
