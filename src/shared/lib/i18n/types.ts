import type { en } from "./locales/en.ts";
import type { SUPPORTED_LOCALES } from "./config.ts";


type Locale = (typeof SUPPORTED_LOCALES)[number];

type TranslationShape<T> = {
    [K in keyof T]: T[K] extends string ? string : TranslationShape<T[K]>;
};

type Translation = TranslationShape<typeof en>;

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation";
        resources: { translation: typeof en };
    }
}

export type { TranslationShape, Translation, Locale };
