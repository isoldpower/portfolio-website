import { en } from "./locales/en.ts";
import { ru } from "./locales/ru.ts";

import type { Locale } from "./config.ts";
import type { Translation } from "./types.ts";


const TRANSLATION_RESOURCES = {
    en: { translation: en },
    ru: { translation: ru },
} as const satisfies Record<Locale, { translation: Translation }>;

export { TRANSLATION_RESOURCES };
