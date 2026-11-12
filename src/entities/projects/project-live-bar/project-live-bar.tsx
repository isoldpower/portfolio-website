import { ProjectLiveBarAddress } from "./bar/project-live-bar-address.tsx";
import { ProjectLiveBarAction } from "./bar/project-live-bar-action.tsx";
import { ProjectLiveBarNote } from "./bar/project-live-bar-note.tsx";
import { cn } from "@shared/lib/utilities";

import type { ProjectLiveBarAddressProps } from "./bar/project-live-bar-address.tsx";
import type { ProjectLiveBarActionProps } from "./bar/project-live-bar-action.tsx";
import type { ProjectLiveBarNoteProps } from "./bar/project-live-bar-note.tsx";
import type { FC, ReactNode } from "react";


interface ProjectLiveBarProps {
    children: ReactNode;
}

type ProjectLiveBarObject = FC<ProjectLiveBarProps> & {
    Address: FC<ProjectLiveBarAddressProps>;
    Action: FC<ProjectLiveBarActionProps>;
    Note: FC<ProjectLiveBarNoteProps>;
};

const ProjectLiveBar: ProjectLiveBarObject = ({ children }) => {
    return (
        <div
            className={cn(
                "mb-3 flex flex-wrap items-center justify-between gap-2",
                "border border-accent bg-surface px-3 py-2"
            )}
        >
            {children}
        </div>
    );
};

ProjectLiveBar.Address = ProjectLiveBarAddress;
ProjectLiveBar.Action = ProjectLiveBarAction;
ProjectLiveBar.Note = ProjectLiveBarNote;
ProjectLiveBar.displayName = "ProjectLiveBar";

export { ProjectLiveBar };
export type { ProjectLiveBarProps };
