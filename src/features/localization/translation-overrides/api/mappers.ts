import { TRANSLATION_RESOURCES, isSupportedLocale } from "@shared/lib/i18n";

import type { UiTranslationsDto } from "./types.ts";
import type { TranslationOverrides, TranslationPatch } from "@shared/lib/i18n";


type PatchNode = string | { [key: string]: PatchNode };

function parseJsonObject(code: string | null): unknown {
    if (!code?.trim()) {
        return null;
    }

    try {
        return JSON.parse(code);
    } catch {
        return null;
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pickKnownStrings(shape: unknown, value: unknown): PatchNode | undefined {
    if (typeof shape === "string") {
        return typeof value === "string"
            ? value
            : undefined;
    } else if (!isRecord(shape) || !isRecord(value)) {
        return undefined;
    }

    const entries = Object.keys(shape)
        .map((key) => [key, pickKnownStrings(shape[key], value[key])] as const)
        .filter((entry): entry is readonly [string, PatchNode] => entry[1] !== undefined);

    return entries.length > 0
        ? Object.fromEntries(entries)
        : undefined;
}

function mapTranslationOverrides(dtos: UiTranslationsDto[]): TranslationOverrides {
    return dtos.reduce<TranslationOverrides>((overrides, dto) => {
        if (!isSupportedLocale(dto.locale)) {
            return overrides;
        }

        const patch = pickKnownStrings(
            TRANSLATION_RESOURCES[dto.locale].translation,
            parseJsonObject(dto.code)
        );
        return isRecord(patch)
            ? { ...overrides, [dto.locale]: patch as TranslationPatch }
            : overrides;
    }, {});
}

export { mapTranslationOverrides };
