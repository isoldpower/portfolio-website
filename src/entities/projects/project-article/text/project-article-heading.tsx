import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


const HEADING_TAGS = { 1: "h1", 2: "h2", 3: "h3", 4: "h4" } as const;

interface ProjectArticleHeadingProps {
    level: 1 | 2 | 3 | 4;
    children: ReactNode;
}

const ProjectArticleHeading: FC<ProjectArticleHeadingProps> = ({ level, children }) => {
    const Element = HEADING_TAGS[level];

    return (
        <Element
            className={cn(
                "m-0 font-sans font-bold text-accent",
                level === 1 && "mt-4 text-3xl leading-tight",
                level === 2 && "mt-6 border-b border-accent/40 pb-2 text-2xl leading-tight",
                level === 3 && "mt-4 text-xl",
                level === 4 && "mt-2 text-lg"
            )}
        >
            {children}
        </Element>
    );
};

ProjectArticleHeading.displayName = "ProjectArticleHeading";

export { ProjectArticleHeading };
export type { ProjectArticleHeadingProps };
