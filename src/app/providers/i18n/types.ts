import type { Locale } from "@shared/lib/i18n";
import type { ReactNode } from "react";


interface InternationalizationProviderProps {
    children: ReactNode;
    locale: Locale;
}

export type { InternationalizationProviderProps };
