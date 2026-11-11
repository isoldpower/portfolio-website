import { createInstance } from "i18next";
import { FALLBACK_LOCALE, SUPPORTED_LOCALES } from "@shared/lib/i18n";

import type { Locale, TranslationResources } from "@shared/lib/i18n";
import type { i18n } from "i18next";


const createInternationalizationInstance = (locale: Locale, resources: TranslationResources): i18n => {
    const instance = createInstance();

    void instance.init({
        lng: locale,
        fallbackLng: FALLBACK_LOCALE,
        supportedLngs: SUPPORTED_LOCALES,
        resources,
        initAsync: false,
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
    });

    return instance;
};

export { createInternationalizationInstance };
