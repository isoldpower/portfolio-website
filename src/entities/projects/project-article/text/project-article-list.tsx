import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface ProjectArticleListProps {
    isOrdered: boolean;
    children: ReactNode;
}

const ProjectArticleList: FC<ProjectArticleListProps> = ({ isOrdered, children }) => {
    const Element = isOrdered ? "ol" : "ul";

    return (
        <Element
            className={cn(
                "m-0 flex flex-col gap-1.5 pl-6 marker:text-accent",
                isOrdered ? "list-decimal" : "list-[square]"
            )}
        >
            {children}
        </Element>
    );
};

ProjectArticleList.displayName = "ProjectArticleList";

export { ProjectArticleList };
export type { ProjectArticleListProps };
