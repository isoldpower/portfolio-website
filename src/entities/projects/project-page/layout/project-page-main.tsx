import type { FC, ReactNode } from "react";


interface ProjectPageMainProps {
    children: ReactNode;
}

const ProjectPageMain: FC<ProjectPageMainProps> = ({ children }) => {
    return (
        <div className="min-w-0 max-lg:contents lg:flex lg:h-full lg:min-h-0 lg:flex-col">
            {children}
        </div>
    );
};

ProjectPageMain.displayName = "ProjectPageMain";

export { ProjectPageMain };
export type { ProjectPageMainProps };
