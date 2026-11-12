import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectCardTitleProps {
    children: ReactNode;
}

const ProjectCardTitle: FC<ProjectCardTitleProps> = ({ children }) => {
    return (
        <Text
            as="h3"
            family="mono"
            size="xl"
            weight="semibold"
            tone="highlight"
            className="m-0 -mt-1 h-lh truncate leading-tight"
        >
            {children}
        </Text>
    );
};

ProjectCardTitle.displayName = "ProjectCardTitle";

export { ProjectCardTitle };
export type { ProjectCardTitleProps };
