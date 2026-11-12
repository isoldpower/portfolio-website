import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface ProjectCardPreviewProps {
    children?: ReactNode;
}

const ProjectCardPreview: FC<ProjectCardPreviewProps> = ({ children }) => {
    return (
        <div
            className={cn(
                "relative h-37.5 overflow-hidden border border-accent p-2",
                "bg-[linear-gradient(0deg,#161a22_0%,#1b2435_100%)]"
            )}
        >
            <div
                aria-hidden="true"
                className={cn(
                    "pointer-events-none absolute inset-0",
                    "bg-[linear-gradient(#6699ff18_1px,transparent_1px)] bg-size-[100%_24px]"
                )}
            />
            <div className="relative size-full">
                {children}
            </div>
        </div>
    );
};

ProjectCardPreview.displayName = "ProjectCardPreview";

export { ProjectCardPreview };
export type { ProjectCardPreviewProps };
