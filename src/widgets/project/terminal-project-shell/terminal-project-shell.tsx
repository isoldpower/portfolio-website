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
        <div id={shellId} className="flex h-[90dvh] flex-col gap-2 py-[5dvh] mb-20">
            <MobileOnly>
                <LockScreen focusTargetId={shellId}>
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
