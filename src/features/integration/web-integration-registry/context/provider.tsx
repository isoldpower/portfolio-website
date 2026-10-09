import { Fragment as FragmentComponent, useMemo } from "react";
import { useIntegrationRegistry } from "../use-integration-registry.ts";
import { IntegrationRegistryContext } from "./context.ts";

import type { FC, ReactNode } from "react";
import type { WebProject } from "@entities/project/model";
import type { IntegrationEntries } from "../IntegrationRegistry.ts";



interface IntegrationRegistryProviderProps {
    children: ReactNode;
    project: WebProject;
    integrations: IntegrationEntries;
}

const IntegrationRegistryProvider: FC<IntegrationRegistryProviderProps> = ({
    children,
    project,
    integrations
}) => {
    const registry = useIntegrationRegistry(integrations);

    const RelatedIntegration = useMemo(() => {
        return project.searchIntegration
            ? registry.resolve(project.slug)
            : FragmentComponent;
    }, [registry, project.searchIntegration, project.slug]);
    const contextValue = useMemo(() => ({
        RelatedIntegration
    }), [RelatedIntegration]);

    return (
        <IntegrationRegistryContext.Provider value={contextValue}>
            {children}
        </IntegrationRegistryContext.Provider>
    );
};

export { IntegrationRegistryProvider, IntegrationRegistryContext };
