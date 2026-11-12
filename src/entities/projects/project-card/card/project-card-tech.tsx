import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectCardTechProps {
    children: ReactNode;
}

const ProjectCardTech: FC<ProjectCardTechProps> = ({ children }) => {
    return (
        <Text
            as="p"
            family="mono"
            size="xs"
            tone="accent"
            className="m-0 line-clamp-2 h-[2lh] leading-[1.6] opacity-90"
        >
            {children}
        </Text>
    );
};

ProjectCardTech.displayName = "ProjectCardTech";

export { ProjectCardTech };
export type { ProjectCardTechProps };
