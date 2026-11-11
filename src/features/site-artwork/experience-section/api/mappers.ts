import { EXPERIENCE_KINDS } from "@entities/site-artwork/model";

import type { ExperienceEntryDto, ExperienceSectionDto } from "./types.ts";
import type { ExperienceEntry, ExperienceKind, ExperienceSection } from "@entities/site-artwork/model";


const isExperienceKind = (kindName: string | null): kindName is ExperienceKind => {
    return EXPERIENCE_KINDS.includes(kindName as ExperienceKind);
};

const mapExperienceEntry = (entryDto: ExperienceEntryDto): ExperienceEntry | null => {
    if (!isExperienceKind(entryDto.kind) || entryDto.start_year === null) {
        return null;
    }

    return {
        key: entryDto._key,
        kind: entryDto.kind,
        title: entryDto.title ?? {},
        organization: entryDto.organization ?? {},
        startYear: entryDto.start_year,
        endYear: entryDto.end_year,
        description: entryDto.description ?? {},
    };
};

const mapExperienceSection = (sectionDto: ExperienceSectionDto): ExperienceSection => {
    const mappedEntries = (sectionDto.entries ?? []).map(mapExperienceEntry);

    return {
        entries: mappedEntries.filter((experienceEntry): experienceEntry is ExperienceEntry => {
            return experienceEntry !== null;
        }),
        videoUrl: sectionDto.video_url,
    };
};

export { mapExperienceSection };
