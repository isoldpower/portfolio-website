import { deepMerge } from "@shared/lib/utilities";

import { SUPPORTED_LOCALES } from "./config.ts";
import { en } from "./locales/en.ts";
import { ru } from "./locales/ru.ts";

import type { Locale } from "./config.ts";
import type { Translation, TranslationOverrides, TranslationResources } from "./types.ts";


const TRANSLATION_RESOURCES = {
    en: { translation: en },
    ru: { translation: ru },
} as const satisfies Record<Locale, { translation: Translation }>;

const mergeTranslationResources = (overrides: TranslationOverrides): TranslationResources => {
    return Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [
        locale,
        { translation: deepMerge(TRANSLATION_RESOURCES[locale].translation, overrides[locale] ?? {}) as Translation },
    ])) as TranslationResources;
};

export { TRANSLATION_RESOURCES, mergeTranslationResources };
