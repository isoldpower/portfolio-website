import { TerminalProjectShell } from "@widgets/project/terminal-project-shell";

import type { FC } from "react";
import type { TerminalProject } from "@entities/project/model";


interface ShowcaseTerminalProjectProps {
    project: TerminalProject;
}

const ShowcaseTerminalProject: FC<ShowcaseTerminalProjectProps> = ({
    project
}) => {
    return (
        <div className="flex flex-col gap-2">
            Terminal Project: {project.title}
            <TerminalProjectShell project={project} />
        </div>
    );
}

export { ShowcaseTerminalProject };
