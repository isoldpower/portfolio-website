import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface ProjectPageScrollProps {
    children: ReactNode;
}

const ProjectPageScroll: FC<ProjectPageScrollProps> = ({ children }) => {
    return (
        <div
            className={cn(
                "flex min-w-0 flex-col max-lg:-order-1 max-lg:border-b max-lg:border-accent lg:min-h-0 lg:flex-1",
                "lg:overflow-y-auto", "[scrollbar-color:var(--color-accent)_transparent] [scrollbar-width:thin]"
            )}
        >
            {children}
        </div>
    );
};

ProjectPageScroll.displayName = "ProjectPageScroll";

export { ProjectPageScroll };
export type { ProjectPageScrollProps };
