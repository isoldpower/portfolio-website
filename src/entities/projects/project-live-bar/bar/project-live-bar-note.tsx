import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectLiveBarNoteProps {
    children: ReactNode;
}

const ProjectLiveBarNote: FC<ProjectLiveBarNoteProps> = ({ children }) => {
    return (
        <Text as="p" family="mono" size="2xs" className="m-0 mt-2 flex items-center gap-2 text-foreground/70">
            <span aria-hidden="true" className="text-accent">›</span>
            {children}
        </Text>
    );
};

ProjectLiveBarNote.displayName = "ProjectLiveBarNote";

export { ProjectLiveBarNote };
export type { ProjectLiveBarNoteProps };
