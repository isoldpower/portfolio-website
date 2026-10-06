import { useId } from "react";

import { LockScreen, useProjectSources } from "@features/project/wasm-fetching";
import { StyledTerminal, useTerminalAdapter } from "@shared/ui-toolkit/terminal";
import { LabeledLockIcon, LabeledUnlockIcon } from "@entities/project/icons";

import type { TerminalProject } from "@entities/project/model";
import type { FC } from "react";
import {MobileOnly} from "@shared/lib/components";


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
        <div id={shellId} className="relative h-dvh flex flex-col gap-2 py-2">
            <MobileOnly>
                <LockScreen focusTargetId={shellId} className="sticky top-0 p-2 border bg-white z-10">
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
