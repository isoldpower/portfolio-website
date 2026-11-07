import { useRouteContext } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { isSupportedLocale } from "@shared/lib/i18n";

import type { Locale } from "@shared/lib/i18n";


type UseActiveLocaleReturn = Locale;

const useActiveLocale = (): UseActiveLocaleReturn => {
    const { locale } = useRouteContext({ from: "__root__" });
    const { i18n } = useTranslation();

    return isSupportedLocale(i18n.language) ? i18n.language : locale;
};

export { useActiveLocale };
export type { UseActiveLocaleReturn };
