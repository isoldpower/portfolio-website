import type { FC, ReactNode } from "react";


interface ProjectArticleParagraphProps {
    children: ReactNode;
}

const ProjectArticleParagraph: FC<ProjectArticleParagraphProps> = ({ children }) => {
    return <p className="m-0">{children}</p>;
};

ProjectArticleParagraph.displayName = "ProjectArticleParagraph";

export { ProjectArticleParagraph };
export type { ProjectArticleParagraphProps };
