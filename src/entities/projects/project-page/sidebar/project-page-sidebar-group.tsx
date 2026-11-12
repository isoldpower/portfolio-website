import type { FC, ReactNode } from "react";


interface ProjectPageSidebarGroupProps {
    children: ReactNode;
}

const ProjectPageSidebarGroup: FC<ProjectPageSidebarGroupProps> = ({ children }) => {
    return (
        <div className="flex flex-col gap-5 border-b border-accent px-5 py-6 last:border-b-0">
            {children}
        </div>
    );
};

ProjectPageSidebarGroup.displayName = "ProjectPageSidebarGroup";

export { ProjectPageSidebarGroup };
export type { ProjectPageSidebarGroupProps };
