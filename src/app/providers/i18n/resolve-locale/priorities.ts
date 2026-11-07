import type { Locale } from "@shared/lib/i18n";


function resolveLocaleInPriority(priorities: (() => Locale | null)[], fallback: Locale) {
    for (const priority of priorities) {
        const priorityValue = priority();

        if (priorityValue) {
            return priorityValue;
        }
    }

    return fallback;
}

export { resolveLocaleInPriority };