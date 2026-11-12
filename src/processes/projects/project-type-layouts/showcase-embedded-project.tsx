import { ProjectArticle } from "@widgets/projects/project-article";

import type { FC } from "react";
import type { EmbeddedProject } from "@entities/projects/model";


interface ShowcaseEmbeddedProjectProps {
    project: EmbeddedProject;
}

const ShowcaseEmbeddedProject: FC<ShowcaseEmbeddedProjectProps> = ({
    project
}) => {
    return (
        <ProjectArticle project={project} />
    );
}

export { ShowcaseEmbeddedProject };
