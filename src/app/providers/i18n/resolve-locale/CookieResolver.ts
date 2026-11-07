import { isSupportedLocale, LOCALE_COOKIE } from "@shared/lib/i18n";
import { createServerOnlyFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import type { Locale } from "@shared/lib/i18n";
import type { IsomorphicI18nResolver } from "./model.ts";


class CookieResolver implements IsomorphicI18nResolver {
    public readonly resolveServer = createServerOnlyFn((): Locale | null => {
        const cookieLocale = getCookie(LOCALE_COOKIE);
        return isSupportedLocale(cookieLocale) ? cookieLocale : null;
    });

    public readonly resolveClient = (): Locale | null => {
        const cookieLocale = this.readClientCookie(LOCALE_COOKIE);

        return isSupportedLocale(cookieLocale) ? cookieLocale : null;
    };

    private readonly readClientCookie = (name: string): string | undefined => {
        const prefix = `${name}=`;
        const match = document.cookie
            .split(";")
            .map((part) => { return part.trim(); })
            .find((part) => { return part.startsWith(prefix); });

        return match ? decodeURIComponent(match.slice(prefix.length)) : undefined;
    };
}

export { CookieResolver };