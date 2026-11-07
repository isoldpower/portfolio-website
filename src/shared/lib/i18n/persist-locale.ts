import { createClientOnlyFn } from "@tanstack/react-start";

import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from "./config.ts";

import type { Locale } from "./config.ts";


const persistLocale = createClientOnlyFn((locale: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
    document.documentElement.lang = locale;
});

export { persistLocale };
