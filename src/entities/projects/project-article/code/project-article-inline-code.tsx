import type { FC, ReactNode } from "react";


interface ProjectArticleInlineCodeProps {
    children: ReactNode;
}

const ProjectArticleInlineCode: FC<ProjectArticleInlineCodeProps> = ({ children }) => {
    return (
        <code className="border border-accent/30 bg-surface px-1.5 py-0.5 text-[0.9em] text-highlight">
            {children}
        </code>
    );
};

ProjectArticleInlineCode.displayName = "ProjectArticleInlineCode";

export { ProjectArticleInlineCode };
export type { ProjectArticleInlineCodeProps };
