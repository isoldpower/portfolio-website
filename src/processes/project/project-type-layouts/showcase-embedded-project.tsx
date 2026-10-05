import type { FC } from "react";
import type { EmbeddedProject } from "@entities/project/model";


interface ShowcaseEmbeddedProjectProps {
    project: EmbeddedProject;
}

const ShowcaseEmbeddedProject: FC<ShowcaseEmbeddedProjectProps> = ({
    project
}) => {
    return (
        <div>Embedded Project: {project.title}</div>
    );
}

export { ShowcaseEmbeddedProject };
