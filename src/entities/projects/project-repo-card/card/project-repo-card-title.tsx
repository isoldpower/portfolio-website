import { Icons } from "@shared/ui-toolkit/icons";
import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";
import {cn} from "@shared/lib/utilities";


interface ProjectRepoCardTitleProps {
    version: ReactNode;
    children: ReactNode;
}

const ProjectRepoCardTitle: FC<ProjectRepoCardTitleProps> = ({ version, children }) => {
    return (
        <span className="flex min-w-0 items-center gap-2">
            <Icons.FolderGit2 aria-hidden="true" className="size-4 shrink-0 text-accent" />
            <Text size="sm" weight="bold" tone="accent" truncate className="min-w-0 flex-1">
                {children}
            </Text>
            {version && (
                <Text
                    family="mono"
                    size="2xs"
                    className={cn("shrink-0 border border-accent/60 px-1.5 py-0.5 text-foreground/80")}
                >
                    {version}
                </Text>
            )}
        </span>
    );
};

ProjectRepoCardTitle.displayName = "ProjectRepoCardTitle";

export { ProjectRepoCardTitle };
export type { ProjectRepoCardTitleProps };
