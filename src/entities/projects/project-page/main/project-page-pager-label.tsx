import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectPagePagerLabelProps {
    direction: "previous" | "next";
    children: ReactNode;
}

const ProjectPagePagerLabel: FC<ProjectPagePagerLabelProps> = ({ direction, children }) => {
    return (
        <Text size="md" weight="semibold" tone="accent" className="inline-flex items-center gap-1.5">
            {direction === "previous" && (
                <span aria-hidden="true">←</span>
            )}
            {children}
            {direction === "next" && (
                <span aria-hidden="true">→</span>
            )}
        </Text>
    );
};

ProjectPagePagerLabel.displayName = "ProjectPagePagerLabel";

export { ProjectPagePagerLabel };
export type { ProjectPagePagerLabelProps };
