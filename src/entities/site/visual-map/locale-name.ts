import type { Locale } from "@shared/lib/i18n";


const NATIVE_NAME_BY_LOCALE: Record<Locale, string> = {
    en: "English",
    ru: "Русский",
};

function resolveLocaleNativeName(locale: Locale): string {
    return NATIVE_NAME_BY_LOCALE[locale];
}

export { resolveLocaleNativeName };
