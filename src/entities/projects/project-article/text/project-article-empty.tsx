import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectArticleEmptyProps {
    children: ReactNode;
}

const ProjectArticleEmpty: FC<ProjectArticleEmptyProps> = ({ children }) => {
    return (
        <Text
            as="p"
            family="mono"
            size="md"
            className="m-0 border border-dashed border-accent/50 p-6 text-foreground/80"
        >
            {children}
        </Text>
    );
};

ProjectArticleEmpty.displayName = "ProjectArticleEmpty";

export { ProjectArticleEmpty };
export type { ProjectArticleEmptyProps };
