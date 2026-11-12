import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectBrowserStatusProps {
    children: ReactNode;
}

const ProjectBrowserStatus: FC<ProjectBrowserStatusProps> = ({ children }) => {
    return (
        <Text as="p" role="status" aria-live="polite" family="mono" size="xs" className="m-0 text-foreground/80">
            {children}
        </Text>
    );
};

ProjectBrowserStatus.displayName = "ProjectBrowserStatus";

export { ProjectBrowserStatus };
export type { ProjectBrowserStatusProps };
