import type { FC, ReactNode } from "react";


interface ProjectBrowserFieldProps {
    children: ReactNode;
}

const ProjectBrowserField: FC<ProjectBrowserFieldProps> = ({ children }) => {
    return (
        <div className="flex min-w-0 flex-col gap-2">
            {children}
        </div>
    );
};

ProjectBrowserField.displayName = "ProjectBrowserField";

export { ProjectBrowserField };
export type { ProjectBrowserFieldProps };
