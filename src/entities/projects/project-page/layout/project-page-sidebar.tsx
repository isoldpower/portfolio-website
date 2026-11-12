import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface ProjectPageSidebarProps {
    children: ReactNode;
}

const ProjectPageSidebar: FC<ProjectPageSidebarProps> = ({ children }) => {
    return (
        <aside
            className={cn(
                "min-w-0 max-lg:contents lg:flex lg:flex-col",
                "lg:h-full lg:min-h-0 lg:overflow-y-auto lg:border-r lg:border-b-0",
                "[scrollbar-color:var(--color-accent)_transparent] [scrollbar-width:thin]"
            )}
        >
            {children}
        </aside>
    );
};

ProjectPageSidebar.displayName = "ProjectPageSidebar";

export { ProjectPageSidebar };
export type { ProjectPageSidebarProps };
