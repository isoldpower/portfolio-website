import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectBrowserLabelProps {
    htmlFor: string;
    children: ReactNode;
}

const ProjectBrowserLabel: FC<ProjectBrowserLabelProps> = ({ htmlFor, children }) => {
    return (
        <Text as="label" htmlFor={htmlFor} family="mono" size="sm" tone="accent" className="max-lg:sr-only">
            {children}
        </Text>
    );
};

ProjectBrowserLabel.displayName = "ProjectBrowserLabel";

export { ProjectBrowserLabel };
export type { ProjectBrowserLabelProps };
