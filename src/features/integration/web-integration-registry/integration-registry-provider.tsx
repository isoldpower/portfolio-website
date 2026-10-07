import { Fragment as FragmentComponent, useMemo } from "react";

import { useIntegrationRegistry } from "./use-integration-registry.ts";

import type { IntegrationEntries } from "./IntegrationRegistry.ts";
import type { WebProject } from "@entities/project/model";
import type { FC, ReactNode } from "react";


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
        if (!project.searchIntegration) {
            return FragmentComponent;
        }

        return registry.resolve(project.slug);
    }, [registry, project.searchIntegration, project.slug]);

    return (
        <RelatedIntegration>
            {children}
        </RelatedIntegration>
    );
};

export { IntegrationRegistryProvider };
