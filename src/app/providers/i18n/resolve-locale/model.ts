import type { Locale } from "@shared/lib/i18n";


interface IsomorphicI18nResolver {
    resolveClient(): Locale | null;
    resolveServer(): Locale | null;
}

export type { IsomorphicI18nResolver };