import { useProjectBrowserState } from "../state/use-project-browser-state.ts";
import { ProjectBrowserContext } from "./project-browser-context.ts";

import type { ProjectCard } from "@entities/projects/model";
import type { FC, ReactNode } from "react";


interface ProjectBrowserProviderProps {
    projects: readonly ProjectCard[];
    scrollTargetId: string;
    children: ReactNode;
}

const ProjectBrowserProvider: FC<ProjectBrowserProviderProps> = ({ projects, scrollTargetId, children }) => {
    const browserContextValue = useProjectBrowserState({ projects, scrollTargetId });

    return (
        <ProjectBrowserContext value={browserContextValue}>
            {children}
        </ProjectBrowserContext>
    );
};

ProjectBrowserProvider.displayName = "ProjectBrowserProvider";

export { ProjectBrowserProvider };
export type { ProjectBrowserProviderProps };
