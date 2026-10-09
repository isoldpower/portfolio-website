import { DemoContextProvider } from "@features/integration/web-demo-context";
import { IntegrationProviderWrapper } from "@processes/integration/web-integration-provider";

import type { FC, ReactNode } from "react";
import type { ProjectDetails } from "@entities/project/model";
import type { IntegrationEntries } from "@features/integration/web-integration-registry";


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