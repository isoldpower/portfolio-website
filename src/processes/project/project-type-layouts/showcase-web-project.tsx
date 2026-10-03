import type { FC } from "react";
import type { WebProject } from "@entities/project";


interface ShowcaseWebProjectProps {
    project: WebProject;
}

const ShowcaseWebProject: FC<ShowcaseWebProjectProps> = ({
    project
}) => {
    return (
        <div>Web Project: {project.title}</div>
    );
}

export { ShowcaseWebProject };
