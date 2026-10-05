import { Fragment as FragmentComponent, useMemo } from "react";
import { useIntegrationRegistry } from "./use-integration-registry.tsx";

import type { WebProject } from "@entities/project/model";
import type { FC, ReactNode } from "react";


interface IntegrationRegistryProps {
    children: ReactNode;
    project: WebProject;
}

const IntegrationRegistryProvider: FC<IntegrationRegistryProps> = ({
    children,
    project
}) => {
    const integrations = useIntegrationRegistry()

    const RelatedIntegration = useMemo(() => {
        if (!project.searchIntegration) {
            return FragmentComponent;
        }

        return integrations.resolve(project.slug);
    }, []);

    return (
        <RelatedIntegration>
            {children}
        </RelatedIntegration>
    );
}

export { IntegrationRegistryProvider };