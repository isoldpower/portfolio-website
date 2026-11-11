import type { LocalizedValue } from "@shared/lib/i18n";


interface AboutPortrait {
    src: string;
    srcSet: string;
    width: number;
    height: number;
    alt: LocalizedValue;
}

interface AboutVariable {
    key: string;
    type: string;
    name: string;
    value: LocalizedValue;
}

interface AboutProfile {
    portrait: AboutPortrait | null;
    description: LocalizedValue;
    variables: AboutVariable[];
    note: LocalizedValue;
}

export type { AboutPortrait, AboutProfile, AboutVariable };
