import { cn } from "@shared/lib/utilities";

import { ProjectRepoCardList } from "./card/project-repo-card-list.tsx";
import { ProjectRepoCardPath } from "./card/project-repo-card-path.tsx";
import { ProjectRepoCardTech } from "./card/project-repo-card-tech.tsx";
import { ProjectRepoCardTitle } from "./card/project-repo-card-title.tsx";

import type { ProjectRepoCardListProps } from "./card/project-repo-card-list.tsx";
import type { ProjectRepoCardPathProps } from "./card/project-repo-card-path.tsx";
import type { ProjectRepoCardTechProps } from "./card/project-repo-card-tech.tsx";
import type { ProjectRepoCardTitleProps } from "./card/project-repo-card-title.tsx";
import type { AnchorHTMLAttributes, FC } from "react";


type ProjectRepoCardProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

type ProjectRepoCardObject = FC<ProjectRepoCardProps> & {
    List: FC<ProjectRepoCardListProps>;
    Title: FC<ProjectRepoCardTitleProps>;
    Path: FC<ProjectRepoCardPathProps>;
    Tech: FC<ProjectRepoCardTechProps>;
};

const ProjectRepoCard: ProjectRepoCardObject = ({ className, children, ...props }) => {
    return (
        <li className="min-w-0">
            <a
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "flex flex-col gap-1.5 border border-accent bg-background p-3 no-underline",
                    "transition-colors hover:bg-accent/10",
                    className
                )}
                {...props}
            >
                {children}
            </a>
        </li>
    );
};

ProjectRepoCard.List = ProjectRepoCardList;
ProjectRepoCard.Title = ProjectRepoCardTitle;
ProjectRepoCard.Path = ProjectRepoCardPath;
ProjectRepoCard.Tech = ProjectRepoCardTech;
ProjectRepoCard.displayName = "ProjectRepoCard";

export { ProjectRepoCard };
export type { ProjectRepoCardProps };
