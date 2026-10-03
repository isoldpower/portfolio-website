import type { FC } from "react";
import type { TerminalProject } from "@entities/project";


interface ShowcaseTerminalProjectProps {
    project: TerminalProject;
}

const ShowcaseTerminalProject: FC<ShowcaseTerminalProjectProps> = ({
    project
}) => {
    return (
        <div>Terminal Project: {project.title}</div>
    );
}

export { ShowcaseTerminalProject };
