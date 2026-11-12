import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes, ReactNode } from "react";


type ProjectBrowserGridProps = HTMLAttributes<HTMLElement> & {
    children: ReactNode;
};

const ProjectBrowserGrid: FC<ProjectBrowserGridProps> = ({ className, children, ...props }) => {
    return (
        <ul className={cn("m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3", className)} {...props}>
            {children}
        </ul>
    );
};

ProjectBrowserGrid.displayName = "ProjectBrowserGrid";

export { ProjectBrowserGrid };
export type { ProjectBrowserGridProps };
