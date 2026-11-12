import { DemoContextProvider } from "@features/integrations/web-demo-context";
import { IntegrationProviderWrapper } from "@processes/integrations/web-integration-provider";

import type { FC, ReactNode } from "react";
import type { ProjectDetails } from "@entities/projects/model";
import type { IntegrationEntries } from "@features/integrations/web-integration-registry";


interface ProvidersWrapperProps {
    project: ProjectDetails;
    integrations: IntegrationEntries;
    children: Required<ReactNode>;
}

const ProvidersWrapper: FC<ProvidersWrapperProps> = ({
    project,
    integrations,
    children
}) => {
    return (
        <DemoContextProvider>
            <IntegrationProviderWrapper project={project} integrations={integrations}>
                {children}
            </IntegrationProviderWrapper>
        </DemoContextProvider>
    );
}

export { ProvidersWrapper };