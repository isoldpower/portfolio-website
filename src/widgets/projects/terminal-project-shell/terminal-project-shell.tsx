import { useId } from "react";
import { LockScreen, useProjectSources } from "@features/projects/wasm-fetching";
import { StyledTerminal, useTerminalAdapter } from "@shared/ui-toolkit/terminal";
import { LabeledLockIcon, LabeledUnlockIcon } from "@entities/projects/icons";
import { MobileOnly } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";

import type { TerminalProject } from "@entities/projects/model";
import type { FC } from "react";


interface TerminalProjectShellProps {
    project: TerminalProject;
}

const TerminalProjectShell: FC<TerminalProjectShellProps> = ({
    project
}) => {
    const shellId = useId();
    const sources = useProjectSources(project);
    const terminalBindings = useTerminalAdapter("ftxui", sources);

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
                {...terminalBindings}
            />
        </div>
    );
}

export { TerminalProjectShell };
