import type { FC, ReactNode } from "react";


interface ProjectBrowserPaginationProps {
    label: string;
    children: ReactNode;
}

const ProjectBrowserPagination: FC<ProjectBrowserPaginationProps> = ({ label, children }) => {
    return (
        <nav aria-label={label} className="flex flex-wrap items-center justify-center gap-2">
            {children}
        </nav>
    );
};

ProjectBrowserPagination.displayName = "ProjectBrowserPagination";

export { ProjectBrowserPagination };
export type { ProjectBrowserPaginationProps };
