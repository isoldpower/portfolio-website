import type { FC, ReactNode } from "react";


interface ProjectPageContentProps {
    children: ReactNode;
}

const ProjectPageContent: FC<ProjectPageContentProps> = ({ children }) => {
    return (
        <div className="flex min-w-0 flex-1 flex-col px-4 py-5 sm:px-5 lg:px-6">
            {children}
        </div>
    );
};

ProjectPageContent.displayName = "ProjectPageContent";

export { ProjectPageContent };
export type { ProjectPageContentProps };
