import type { FC, ReactNode } from "react";
import {cn} from "@shared/lib/utilities";


interface ProjectArticleCodeBlockProps {
    children: ReactNode;
}

const ProjectArticleCodeBlock: FC<ProjectArticleCodeBlockProps> = ({ children }) => {
    return (
        <pre
            className={cn(
                "m-0 overflow-x-auto border border-accent/40 bg-surface p-4 text-sm leading-[1.6]",
                "text-foreground [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
            )}
        >
            {children}
        </pre>
    );
};

ProjectArticleCodeBlock.displayName = "ProjectArticleCodeBlock";

export { ProjectArticleCodeBlock };
export type { ProjectArticleCodeBlockProps };
