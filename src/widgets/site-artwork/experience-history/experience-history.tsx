import { ExperienceTree } from "@entities/site-artwork/experience-tree";
import { useExperienceGroups } from "@features/site-artwork/experience-section";
import { ScrollStagger } from "@features/site-artwork/scroll-reveal";
import { AnimationComposer } from "@shared/lib/components";

import { ExperienceHistoryEntry } from "./history/experience-history-entry.tsx";

import type { ExperienceEntry } from "@entities/site-artwork/model";


interface ExperienceHistoryProps {
    entries: readonly ExperienceEntry[];
}

function ExperienceHistory({ entries }: ExperienceHistoryProps) {
    const groupViews = useExperienceGroups(entries);

    return (
        <AnimationComposer>
            <ScrollStagger />
            <ExperienceTree>
                {groupViews.map((groupView) => (
                    <ExperienceTree.Group key={groupView.experienceKind} command={groupView.commandText}>
                        {groupView.entryViews.map((entryView) => (
                            <ExperienceHistoryEntry key={entryView.experienceEntry.key} entryView={entryView} />
                        ))}
                    </ExperienceTree.Group>
                ))}
            </ExperienceTree>
        </AnimationComposer>
    );
}

export { ExperienceHistory };
export type { ExperienceHistoryProps };
