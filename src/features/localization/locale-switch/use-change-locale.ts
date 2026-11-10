import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { persistLocale } from "@shared/lib/i18n";

import type { Locale } from "@shared/lib/i18n";


type UseChangeLocaleReturn = (locale: Locale) => Promise<void>;

const useChangeLocale = (): UseChangeLocaleReturn => {
    const { i18n } = useTranslation();

    return useCallback(async (locale: Locale) => {
        persistLocale(locale);
        await i18n.changeLanguage(locale);
        document.title = i18n.t("meta.title");
    }, [ i18n ]);
};

export { useChangeLocale };
export type { UseChangeLocaleReturn };
