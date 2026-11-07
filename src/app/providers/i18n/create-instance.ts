import { createInstance } from "i18next";
import { FALLBACK_LOCALE, SUPPORTED_LOCALES, TRANSLATION_RESOURCES } from "@shared/lib/i18n";

import type { Locale } from "@shared/lib/i18n";
import type { i18n } from "i18next";


const createInternationalizationInstance = (locale: Locale): i18n => {
    const instance = createInstance();

    void instance.init({
        lng: locale,
        fallbackLng: FALLBACK_LOCALE,
        supportedLngs: SUPPORTED_LOCALES,
        resources: TRANSLATION_RESOURCES,
        initAsync: false,
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
    });

    return instance;
};

export { createInternationalizationInstance };
