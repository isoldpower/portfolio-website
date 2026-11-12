import type { LocalizedValue } from "@shared/lib/i18n";


const EXPERIENCE_KINDS = ["work", "education"] as const;

type ExperienceKind = (typeof EXPERIENCE_KINDS)[number];

interface ExperienceEntry {
    key: string;
    kind: ExperienceKind;
    title: LocalizedValue;
    organization: LocalizedValue;
    startYear: number;
    endYear: number | null;
    description: LocalizedValue;
}

interface ExperienceSection {
    entries: ExperienceEntry[];
    videoUrl: string | null;
}

export { EXPERIENCE_KINDS };
export type { ExperienceEntry, ExperienceKind, ExperienceSection };
