import { isSupportedLocale } from "@shared/lib/i18n";
import { createServerOnlyFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

import type { Locale } from "@shared/lib/i18n";
import type { IsomorphicI18nResolver } from "./model.ts";


class HeaderResolver implements IsomorphicI18nResolver {
    public readonly resolveServer = createServerOnlyFn((): Locale | null => {
        const requestHeader = getRequestHeader("accept-language");
        const headersLocale = this.pickFromAcceptLanguage(requestHeader);

        return headersLocale ?? null;
    });

    public readonly resolveClient = (): Locale | null => {
        const documentLocale = document.documentElement.lang;

        return isSupportedLocale(documentLocale) ? documentLocale : null;
    };

    private readonly pickFromAcceptLanguage = (header: string | undefined): Locale | undefined => {
        if (!header) {
            return undefined;
        }

        const rankedLocales = header
            .split(",")
            .map(this.weightedDecision)
            .filter((entry) => entry.weight > 0)
            .sort((left, right) => right.weight - left.weight);

        return rankedLocales.find((entry) => {
            return isSupportedLocale(entry.language);
        })?.language as (Locale | undefined);
    };

    private readonly weightedDecision = (entry: string) => {
        const [ tag, ...params ] = entry.trim().split(";");
        const quality = params.find((param) => {
            return param.trim().startsWith("q=");
        });

        return {
            language: tag.split("-")[0].toLowerCase(),
            weight: quality
                ? (Number(quality.trim().slice(2)) || 0)
                : 1,
        };
    };
}

export { HeaderResolver };