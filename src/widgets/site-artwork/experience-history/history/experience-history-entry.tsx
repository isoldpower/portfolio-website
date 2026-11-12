import { ExperienceEntry } from "@entities/site-artwork/experience-entry";
import { useLocalize } from "@features/localization/localized-value";

import type { ExperienceEntryView } from "@features/site-artwork/experience-section";


interface ExperienceHistoryEntryProps {
    entryView: ExperienceEntryView;
}

function ExperienceHistoryEntry({ entryView }: ExperienceHistoryEntryProps) {
    const localize = useLocalize();

    return (
        <ExperienceEntry isLast={entryView.isLast}>
            <ExperienceEntry.Heading>
                <ExperienceEntry.Title>
                    {localize(entryView.experienceEntry.title)}
                </ExperienceEntry.Title>
                <ExperienceEntry.Meta>
                    {`${localize(entryView.experienceEntry.organization)} · ${entryView.periodText}`}
                </ExperienceEntry.Meta>
            </ExperienceEntry.Heading>
            <ExperienceEntry.Description>
                {localize(entryView.experienceEntry.description)}
            </ExperienceEntry.Description>
        </ExperienceEntry>
    );
}

export { ExperienceHistoryEntry };
export type { ExperienceHistoryEntryProps };
