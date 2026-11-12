import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ExperienceEntryTitleProps {
    children: ReactNode;
}

const ExperienceEntryTitle: FC<ExperienceEntryTitleProps> = ({ children }) => {
    return (
        <Text size="lg" weight="semibold" tone="accent" className="text-shadow-soft">
            {children}
        </Text>
    );
};

ExperienceEntryTitle.displayName = "ExperienceEntryTitle";

export { ExperienceEntryTitle };
export type { ExperienceEntryTitleProps };
