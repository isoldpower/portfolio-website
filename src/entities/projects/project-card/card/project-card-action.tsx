import type { FC, ReactNode } from "react";


interface ProjectCardActionProps {
    children: ReactNode;
}

const ProjectCardAction: FC<ProjectCardActionProps> = ({ children }) => {
    return (
        <div className="mt-auto pt-1">
            {children}
        </div>
    );
};

ProjectCardAction.displayName = "ProjectCardAction";

export { ProjectCardAction };
export type { ProjectCardActionProps };
