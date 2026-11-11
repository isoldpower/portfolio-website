import { useCallback } from "react";

import { FALLBACK_LOCALE } from "@shared/lib/i18n";

import { useActiveLocale } from "../locale-switch/use-active-locale.ts";

import type { LocalizedValue } from "@shared/lib/i18n";


type UseLocalizeReturn = (value: LocalizedValue) => string;

const useLocalize = (): UseLocalizeReturn => {
    const locale = useActiveLocale();

    return useCallback((value) => {
        return value[locale] ?? value[FALLBACK_LOCALE] ?? "";
    }, [locale]);
};

export { useLocalize };
export type { UseLocalizeReturn };
