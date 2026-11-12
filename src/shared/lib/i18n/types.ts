import type { en } from "./locales/en.ts";
import type { SUPPORTED_LOCALES } from "./config.ts";


type Locale = (typeof SUPPORTED_LOCALES)[number];

type LocalizedValue = Partial<Record<Locale, string>>;

type TranslationShape<T> = {
    [K in keyof T]: T[K] extends string ? string : TranslationShape<T[K]>;
};

type Translation = TranslationShape<typeof en>;

type TranslationPatch<T = Translation> = {
    [K in keyof T]?: T[K] extends string ? string : TranslationPatch<T[K]>;
};

type TranslationOverrides = Partial<Record<Locale, TranslationPatch>>;

type TranslationResources = Record<Locale, { translation: Translation }>;

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation";
        resources: { translation: typeof en };
    }
}

export type {
    TranslationShape,
    Translation,
    TranslationPatch,
    TranslationOverrides,
    TranslationResources,
    Locale,
    LocalizedValue
};
