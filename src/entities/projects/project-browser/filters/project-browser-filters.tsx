import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface ProjectBrowserFiltersProps {
    children: ReactNode;
}

const ProjectBrowserFilters: FC<ProjectBrowserFiltersProps> = ({ children }) => {
    return (
        <div
            role="search"
            className={cn(
                "grid items-end gap-4 sm:grid-cols-2",
                "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
            )}
        >
            {children}
        </div>
    );
};

ProjectBrowserFilters.displayName = "ProjectBrowserFilters";

export { ProjectBrowserFilters };
export type { ProjectBrowserFiltersProps };
