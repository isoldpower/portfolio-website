import type { Locale } from "./types.ts";


const SUPPORTED_LOCALES = [ "en", "ru" ] as const;

const FALLBACK_LOCALE: Locale = "en";

const LOCALE_COOKIE = "locale";

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const isSupportedLocale = (value: string | undefined | null): value is Locale => {
    return SUPPORTED_LOCALES.includes(value as Locale);
};

export {
    FALLBACK_LOCALE,
    isSupportedLocale,
    LOCALE_COOKIE,
    LOCALE_COOKIE_MAX_AGE,
    SUPPORTED_LOCALES
};
export type { Locale };
