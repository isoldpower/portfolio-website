import { cn } from "@shared/lib/utilities";
import { PlainText, Text } from "@shared/ui-toolkit/typography";

import { ExperienceEntryDescription } from "./entry/experience-entry-description.tsx";
import { ExperienceEntryHeading } from "./entry/experience-entry-heading.tsx";
import { ExperienceEntryMeta } from "./entry/experience-entry-meta.tsx";
import { ExperienceEntryTitle } from "./entry/experience-entry-title.tsx";

import type { ExperienceEntryDescriptionProps } from "./entry/experience-entry-description.tsx";
import type { ExperienceEntryHeadingProps } from "./entry/experience-entry-heading.tsx";
import type { ExperienceEntryMetaProps } from "./entry/experience-entry-meta.tsx";
import type { ExperienceEntryTitleProps } from "./entry/experience-entry-title.tsx";
import type { FC, ReactNode } from "react";


interface ExperienceEntryProps {
    isLast: boolean;
    children: ReactNode;
}

type ExperienceEntryObject = FC<ExperienceEntryProps> & {
    Heading: FC<ExperienceEntryHeadingProps>;
    Title: FC<ExperienceEntryTitleProps>;
    Meta: FC<ExperienceEntryMetaProps>;
    Description: FC<ExperienceEntryDescriptionProps>;
};

const ExperienceEntry: ExperienceEntryObject = ({ isLast, children }) => {
    return (
        <Text as="li" family="mono" size="md" tone="strong" className="grid grid-cols-[3ch_minmax(0,1fr)] gap-x-2">
            <PlainText aria-hidden="true" className="col-start-1 row-start-1 text-accent/70">
                {isLast ? "└──" : "├──"}
            </PlainText>
            <span
                aria-hidden="true"
                className={cn(
                    "col-start-1 row-start-2 ml-[0.5ch] border-l border-accent/50",
                    isLast && "border-transparent"
                )}
            />
            {children}
        </Text>
    );
};

ExperienceEntry.Heading = ExperienceEntryHeading;
ExperienceEntry.Title = ExperienceEntryTitle;
ExperienceEntry.Meta = ExperienceEntryMeta;
ExperienceEntry.Description = ExperienceEntryDescription;
ExperienceEntry.displayName = "ExperienceEntry";

export { ExperienceEntry };
export type { ExperienceEntryProps };
