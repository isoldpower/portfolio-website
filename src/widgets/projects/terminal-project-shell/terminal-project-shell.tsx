import { useId } from "react";

import { ProjectFrame } from "@entities/integrations/project-frame";
import { LabeledLockIcon, LabeledUnlockIcon } from "@entities/projects/icons";
import { LoaderFade, useLoadingProgress } from "@features/integrations/frame-loading";
import { useTerminalStartup } from "@features/projects/terminal-startup";
import { LockScreen, useProjectSources } from "@features/projects/wasm-fetching";
import { AnimationComposer, MobileOnly } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";
import { StyledTerminal, useTerminalAdapter } from "@shared/ui-toolkit/terminal";

import type { TerminalProject } from "@entities/projects/model";
import type { FC } from "react";


interface TerminalProjectShellProps {
    project: TerminalProject;
}

const TerminalProjectShell: FC<TerminalProjectShellProps> = ({
    project
}) => {
    const shellId = useId();
    const projectSources = useProjectSources(project);
    const adapterBindings = useTerminalAdapter("ftxui", projectSources);
    const terminalStartup = useTerminalStartup(adapterBindings);
    const terminalLoading = useLoadingProgress({
        key: projectSources.wasmSource,
        isLoaded: terminalStartup.hasStarted,
    });

    return (
        <div
            id={shellId}
            className={cn(
                "relative flex h-[calc(100dvh-var(--spacing-header)-var(--spacing-footer)-15rem)]",
                "min-h-112 flex-col gap-2"
            )}
        >
            <MobileOnly>
                <LockScreen
                    focusTargetId={shellId}
                    className="sticky top-0 z-10 border border-accent bg-background p-2 text-accent"
                >
                    {(locked) => locked
                        ? <LabeledLockIcon>Unlock</LabeledLockIcon>
                        : <LabeledUnlockIcon>Lock</LabeledUnlockIcon>
                    }
                </LockScreen>
            </MobileOnly>
            <StyledTerminal
                autoResize
                autoFocus
                terminalRuntime="ftxui"
                className="min-h-0 h-full flex-1"
                {...terminalStartup.bindings}
            />
            {!terminalLoading.isSettled && (
                <AnimationComposer>
                    <LoaderFade />
                    <ProjectFrame.Loader progress={terminalLoading.progress} isHidden={terminalLoading.isHidden}>
                        <ProjectFrame.LoaderBar progress={terminalLoading.progress} />
                        <ProjectFrame.LoaderStage values={{ host: project.wasmArtifact }}>
                            _t(project.frame.{terminalLoading.stage})
                        </ProjectFrame.LoaderStage>
                    </ProjectFrame.Loader>
                </AnimationComposer>
            )}
        </div>
    );
}

export { TerminalProjectShell };
