import { useRef } from "react";
import {
    ShowcaseEmbeddedProject,
    ShowcaseTerminalProject,
    ShowcaseWebProject
} from "@processes/project/project-type-layouts";
import { IntegrationRegistryProvider } from "@processes/project/web-integration-registry";

import type { BranchingSchema } from "@features/project/project-branching";


const useBranchingSchema = (): BranchingSchema => {
    const branchingSchema = useRef<BranchingSchema>({
        terminal: (project) => function TerminalShowcase() {
            return (
                <ShowcaseTerminalProject project={project} />
            );
        },
        web: (project) => function WebShowcase() {
            return (
                <IntegrationRegistryProvider project={project}>
                    <ShowcaseWebProject project={project} />
                </IntegrationRegistryProvider>
            );
        },
        embedded: (project) => function EmbeddedShowcase() {
            return (
                <ShowcaseEmbeddedProject project={project} />
            );
        },
    });

    return branchingSchema.current;
};

export { useBranchingSchema };
