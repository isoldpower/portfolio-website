import type { FC, ReactNode } from "react";
import {cn} from "@shared/lib/utilities";


interface ProjectPagePagerProps {
    label: string;
    children: ReactNode;
}

const ProjectPagePager: FC<ProjectPagePagerProps> = ({ label, children }) => {
    return (
        <nav
            aria-label={label}
            className={cn(
                "flex shrink-0 items-center justify-between gap-4 max-lg:order-last",
                "border-t border-accent px-5 py-3 lg:px-6"
            )}
        >
            {children}
        </nav>
    );
};

ProjectPagePager.displayName = "ProjectPagePager";

export { ProjectPagePager };
export type { ProjectPagePagerProps };
