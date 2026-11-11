import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectCardPlaceholderTitleProps {
    children: ReactNode;
}

const ProjectCardPlaceholderTitle: FC<ProjectCardPlaceholderTitleProps> = ({ children }) => {
    return (
        <Text family="mono" size="lg" tone="accent">
            {children}
        </Text>
    );
};

ProjectCardPlaceholderTitle.displayName = "ProjectCardPlaceholderTitle";

export { ProjectCardPlaceholderTitle };
export type { ProjectCardPlaceholderTitleProps };
