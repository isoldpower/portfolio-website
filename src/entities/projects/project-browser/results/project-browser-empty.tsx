import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectBrowserEmptyProps {
    children: ReactNode;
}

const ProjectBrowserEmpty: FC<ProjectBrowserEmptyProps> = ({ children }) => {
    return (
        <Text as="p" family="mono" size="base" tone="accent" className="m-0 border border-dashed border-accent/50 p-6">
            {children}
        </Text>
    );
};

ProjectBrowserEmpty.displayName = "ProjectBrowserEmpty";

export { ProjectBrowserEmpty };
export type { ProjectBrowserEmptyProps };
