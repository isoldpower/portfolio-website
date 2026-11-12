import type { FC, ReactNode } from "react";


interface ProjectFrameStageProps {
    children: ReactNode;
}

const ProjectFrameStage: FC<ProjectFrameStageProps> = ({ children }) => {
    return (
        <div className="relative">
            {children}
        </div>
    );
};

ProjectFrameStage.displayName = "ProjectFrameStage";

export { ProjectFrameStage };
export type { ProjectFrameStageProps };
