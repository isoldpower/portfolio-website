import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectRepoCardPathProps {
    children: ReactNode;
}

const ProjectRepoCardPath: FC<ProjectRepoCardPathProps> = ({ children }) => {
    return (
        <span className="flex min-w-0 items-center gap-1">
            <Text family="mono" size="xs" truncate className="min-w-0 text-foreground/70">
                {children}
            </Text>
            <span aria-hidden="true" className="shrink-0 font-mono text-xs text-accent">↗</span>
        </span>
    );
};

ProjectRepoCardPath.displayName = "ProjectRepoCardPath";

export { ProjectRepoCardPath };
export type { ProjectRepoCardPathProps };
