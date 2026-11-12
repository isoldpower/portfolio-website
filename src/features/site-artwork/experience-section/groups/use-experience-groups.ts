import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { EXPERIENCE_KINDS } from "@entities/site-artwork/model";

import { GROUP_COMMANDS } from "../constants.ts";

import type { ExperienceEntry, ExperienceKind } from "@entities/site-artwork/model";


interface ExperienceEntryView {
    experienceEntry: ExperienceEntry;
    periodText: string;
    isLast: boolean;
}

interface ExperienceGroupView {
    experienceKind: ExperienceKind;
    commandText: string;
    entryViews: readonly ExperienceEntryView[];
}

type UseExperienceGroupsReturn = readonly ExperienceGroupView[];

const useExperienceGroups = (
    experienceEntries: readonly ExperienceEntry[]
): UseExperienceGroupsReturn => {
    const { t } = useTranslation();

    const periodTextOf = useCallback((experienceEntry: ExperienceEntry): string => {
        const startYearText = String(experienceEntry.startYear);
        if (experienceEntry.endYear === experienceEntry.startYear) {
            return startYearText;
        }

        const endYearText = experienceEntry.endYear === null
            ? t("experience.present")
            : String(experienceEntry.endYear);

        return `${startYearText} — ${endYearText}`;
    }, [t]);

    const groupViewOf = useCallback((experienceKind: ExperienceKind): ExperienceGroupView => {
        const kindEntries = experienceEntries.filter((experienceEntry) => {
            return experienceEntry.kind === experienceKind;
        });

        return {
            experienceKind,
            commandText: GROUP_COMMANDS[experienceKind],
            entryViews: kindEntries.map((experienceEntry, entryIndex) => {
                return {
                    experienceEntry,
                    periodText: periodTextOf(experienceEntry),
                    isLast: entryIndex === kindEntries.length - 1,
                };
            }),
        };
    }, [experienceEntries, periodTextOf]);

    return useMemo(() => {
        return EXPERIENCE_KINDS.map(groupViewOf).filter((groupView) => {
            return groupView.entryViews.length > 0;
        });
    }, [groupViewOf]);
};

export { useExperienceGroups };
export type { ExperienceEntryView, ExperienceGroupView, UseExperienceGroupsReturn };
