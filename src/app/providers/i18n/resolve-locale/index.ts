import { createIsomorphicFn } from "@tanstack/react-start";
import { FALLBACK_LOCALE } from "@shared/lib/i18n";
import { resolveLocaleInPriority } from "./priorities.ts";
import { CookieResolver } from "./CookieResolver.ts";
import { HeaderResolver } from "./HeaderResolver.ts";

import type { Locale } from "@shared/lib/i18n";
import type { IsomorphicI18nResolver } from "./model.ts";


const IsomorphicI18nResolvers: IsomorphicI18nResolver[] = [
    new CookieResolver(),
    new HeaderResolver(),
]

const resolveLocale = createIsomorphicFn()
    .server((): Locale => resolveLocaleInPriority(
        IsomorphicI18nResolvers.map((resolver) => resolver.resolveServer),
        FALLBACK_LOCALE,
    ))
    .client((): Locale => resolveLocaleInPriority(
        IsomorphicI18nResolvers.map((resolver) => resolver.resolveClient),
        FALLBACK_LOCALE,
    ));

export { resolveLocale };
