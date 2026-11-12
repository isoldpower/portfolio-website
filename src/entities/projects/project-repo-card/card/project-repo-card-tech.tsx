import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectRepoCardTechProps {
    children: ReactNode;
}

const ProjectRepoCardTech: FC<ProjectRepoCardTechProps> = ({ children }) => {
    return (
        <Text as="p" family="mono" size="2xs" tone="accent" className="m-0 leading-[1.6] opacity-90">
            {children}
        </Text>
    );
};

ProjectRepoCardTech.displayName = "ProjectRepoCardTech";

export { ProjectRepoCardTech };
export type { ProjectRepoCardTechProps };
