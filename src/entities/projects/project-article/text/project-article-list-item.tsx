import type { FC, ReactNode } from "react";


interface ProjectArticleListItemProps {
    children: ReactNode;
}

const ProjectArticleListItem: FC<ProjectArticleListItemProps> = ({ children }) => {
    return (
        <li className="pl-1">
            {children}
        </li>
    );
};

ProjectArticleListItem.displayName = "ProjectArticleListItem";

export { ProjectArticleListItem };
export type { ProjectArticleListItemProps };
