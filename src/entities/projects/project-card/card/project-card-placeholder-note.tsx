import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectCardPlaceholderNoteProps {
    children: ReactNode;
}

const ProjectCardPlaceholderNote: FC<ProjectCardPlaceholderNoteProps> = ({ children }) => {
    return (
        <Text family="mono" size="2xs" tone="accent" className="opacity-70">
            {children}
        </Text>
    );
};

ProjectCardPlaceholderNote.displayName = "ProjectCardPlaceholderNote";

export { ProjectCardPlaceholderNote };
export type { ProjectCardPlaceholderNoteProps };
