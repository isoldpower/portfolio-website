import type { FC, ReactNode } from "react";
import {cn} from "@shared/lib/utilities";


interface ProjectCardPlaceholderProps {
    children: ReactNode;
}

const ProjectCardPlaceholder: FC<ProjectCardPlaceholderProps> = ({ children }) => {
    return (
        <div
            className={cn(
                "flex size-full flex-col items-center justify-center gap-2",
                "border border-accent/60 text-center"
            )}
        >
            {children}
        </div>
    );
};

ProjectCardPlaceholder.displayName = "ProjectCardPlaceholder";

export { ProjectCardPlaceholder };
export type { ProjectCardPlaceholderProps };
