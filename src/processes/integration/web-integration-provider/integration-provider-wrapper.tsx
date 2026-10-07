import { IntegrationRegistryProvider } from "@features/integration/web-integration-registry";
import { FinanceInfraVisualization } from "@widgets/integration/finance-infra-visualization";

import type { WebProject } from "@entities/project/model";
import type { IntegrationEntries } from "@features/integration/web-integration-registry";
import type { FC, ReactNode } from "react";


const WEB_INTEGRATIONS: IntegrationEntries = {
    "power-finance": FinanceInfraVisualization,
};

interface IntegrationProviderWrapperProps {
    children: ReactNode;
    project: WebProject;
}

const IntegrationProviderWrapper: FC<IntegrationProviderWrapperProps> = ({
    children,
    project
}) => {
    return (
        <IntegrationRegistryProvider project={project} integrations={WEB_INTEGRATIONS}>
            {children}
        </IntegrationRegistryProvider>
    );
};

export { IntegrationProviderWrapper };
