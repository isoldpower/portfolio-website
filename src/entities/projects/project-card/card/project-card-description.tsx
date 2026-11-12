import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectCardDescriptionProps {
    children: ReactNode;
}

const ProjectCardDescription: FC<ProjectCardDescriptionProps> = ({ children }) => {
    return (
        <Text as="p" family="mono" size="sm" tone="accent" className="m-0 line-clamp-3 h-[3lh] leading-[1.6]">
            {children}
        </Text>
    );
};

ProjectCardDescription.displayName = "ProjectCardDescription";

export { ProjectCardDescription };
export type { ProjectCardDescriptionProps };
