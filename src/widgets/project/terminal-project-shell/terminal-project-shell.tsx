import { useProjectSources } from "@features/project/wasm-fetching";
import { StyledTerminal, useTerminalAdapter } from "@shared/ui-toolkit/terminal";

import type { TerminalProject } from "@entities/project";
import type { FC } from "react";


interface TerminalProjectShellProps {
    project: TerminalProject;
}

const TerminalProjectShell: FC<TerminalProjectShellProps> = ({
    project
}) => {
    const sources = useProjectSources(project);
    const terminalBindings = useTerminalAdapter("ftxui", sources);

    return (
        <StyledTerminal
            autoResize
            autoFocus
            terminalRuntime="ftxui"
            className="min-h-120 h-[80dvh]"
            {...terminalBindings}
        />
    );
}

export { TerminalProjectShell };
