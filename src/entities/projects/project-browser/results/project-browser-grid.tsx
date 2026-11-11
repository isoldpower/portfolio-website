import type { FC, ReactNode } from "react";


interface ProjectBrowserGridProps {
    children: ReactNode;
}

const ProjectBrowserGrid: FC<ProjectBrowserGridProps> = ({ children }) => {
    return (
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {children}
        </ul>
    );
};

ProjectBrowserGrid.displayName = "ProjectBrowserGrid";

export { ProjectBrowserGrid };
export type { ProjectBrowserGridProps };
