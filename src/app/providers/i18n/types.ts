import type { Locale, TranslationResources } from "@shared/lib/i18n";
import type { ReactNode } from "react";


interface InternationalizationProviderProps {
    children: ReactNode;
    locale: Locale;
    resources: TranslationResources;
}

export type { InternationalizationProviderProps };
