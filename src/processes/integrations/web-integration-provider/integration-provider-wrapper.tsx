import { IntegrationRegistryProvider } from "@features/integrations/web-integration-registry";

import type { ProjectDetails } from "@entities/projects/model";
import type { IntegrationEntries } from "@features/integrations/web-integration-registry";
import type { FC, ReactNode } from "react";


interface IntegrationProviderWrapperProps {
    children: ReactNode;
    project: ProjectDetails;
    integrations: IntegrationEntries;
}

const IntegrationProviderWrapper: FC<IntegrationProviderWrapperProps> = ({
    children,
    project,
    integrations,
}) => {
    if (project.kind !== 'web') {
        return children;
    }

    return (
        <IntegrationRegistryProvider project={project} integrations={integrations}>
            {children}
        </IntegrationRegistryProvider>
    );
};

export { IntegrationProviderWrapper };
