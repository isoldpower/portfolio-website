import { SUPPORTED_LOCALES } from "@shared/lib/i18n";

import type { TranslationApiClient, UiTranslationsDto } from "../types.ts";


interface ListUiTranslationsOptions {
    client: TranslationApiClient;
}

type ListUiTranslationsResponse = UiTranslationsDto[];


const UI_TRANSLATIONS_QUERY = `*[_type == "ui_translations" && locale in $locales]{
    locale,
    "code": messages.code
}`;

const listUiTranslations = async ({ client }: ListUiTranslationsOptions): Promise<ListUiTranslationsResponse> => {
    return client.fetch<ListUiTranslationsResponse>(UI_TRANSLATIONS_QUERY, {
        locales: [...SUPPORTED_LOCALES]
    });
};

export { listUiTranslations };
export type { ListUiTranslationsOptions, ListUiTranslationsResponse };
