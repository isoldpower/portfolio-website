import { ProjectLiveBar } from "@entities/projects/project-live-bar";
import { JourneyButtonHover } from "@features/projects/journey-animations";
import { useProjectRelease } from "@features/projects/wasm-fetching";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { AnimationComposer } from "@shared/lib/components";
import { TerminalProjectShell } from "@widgets/projects/terminal-project-shell";

import type { FC } from "react";
import type { TerminalProject } from "@entities/projects/model";


interface ShowcaseTerminalProjectProps {
    project: TerminalProject;
}

const ShowcaseTerminalProject: FC<ShowcaseTerminalProjectProps> = ({
    project
}) => {
    const release = useProjectRelease(project);

    return (
        <>
            <ProjectLiveBar>
                <ProjectLiveBar.Address label="_t(project.terminal_label)">
                    {release.address}
                </ProjectLiveBar.Address>
                <AnimationComposer>
                    <FocusOutline />
                    <JourneyButtonHover />
                    <ProjectLiveBar.Action href={release.href}>
                        _t(project.terminal_cta)
                    </ProjectLiveBar.Action>
                </AnimationComposer>
            </ProjectLiveBar>
            <TerminalProjectShell project={project} />
            <ProjectLiveBar.Note>
                _t(project.terminal_note)
            </ProjectLiveBar.Note>
        </>
    );
}

export { ShowcaseTerminalProject };
