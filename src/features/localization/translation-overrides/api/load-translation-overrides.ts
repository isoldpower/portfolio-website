import { listUiTranslations } from "./queries/list-ui-translations.ts";
import { mapTranslationOverrides } from "./mappers.ts";

import type { TranslationApiClient } from "./types.ts";
import type { TranslationOverrides } from "@shared/lib/i18n";


interface LoadTranslationOverridesOptions {
    client: TranslationApiClient;
}

const loadTranslationOverrides = async ({ client }: LoadTranslationOverridesOptions): Promise<TranslationOverrides> => {
    try {
        const translationList = await listUiTranslations({ client });

        return mapTranslationOverrides(translationList);
    } catch {
        return {};
    }
};

export { loadTranslationOverrides };
export type { LoadTranslationOverridesOptions };
