export { persistLocale } from "./persist-locale.ts";
export { TRANSLATION_RESOURCES, mergeTranslationResources } from "./resources.ts";
export {
    FALLBACK_LOCALE,
    isSupportedLocale,
    LOCALE_COOKIE,
    LOCALE_COOKIE_MAX_AGE,
    SUPPORTED_LOCALES
} from "./config.ts";

export type { Locale } from "./config.ts";
export type {
    LocalizedValue,
    Translation,
    TranslationOverrides,
    TranslationPatch,
    TranslationResources,
    TranslationShape
} from "./types.ts";
