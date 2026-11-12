import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ExperienceEntryMetaProps {
    children: ReactNode;
}

const ExperienceEntryMeta: FC<ExperienceEntryMetaProps> = ({ children }) => {
    return (
        <Text size="base" tone="strong">
            {children}
        </Text>
    );
};

ExperienceEntryMeta.displayName = "ExperienceEntryMeta";

export { ExperienceEntryMeta };
export type { ExperienceEntryMetaProps };
