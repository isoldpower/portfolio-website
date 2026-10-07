import { useRef } from "react";
import {
    ShowcaseEmbeddedProject,
    ShowcaseTerminalProject,
    ShowcaseWebProject
} from "@processes/project/project-type-layouts";
import {
    IntegrationProviderWrapper
} from "@processes/integration/web-integration-provider";

import type { BranchingSchema } from "@features/project/project-branching";


const useBranchingSchema = (): BranchingSchema => {
    const branchingSchema = useRef<BranchingSchema>({
        terminal: (project) => function TerminalShowcase({
            children,
        }) {
            return (
                <>
                    <ShowcaseTerminalProject project={project} />
                    {children}
                </>
            );
        },
        web: (project) => function WebShowcase({
            children
        }) {
            return (
                <>
                    <IntegrationProviderWrapper project={project}>
                        <ShowcaseWebProject project={project} />
                    </IntegrationProviderWrapper>
                    {children}
                </>
            );
        },
        embedded: (project) => function EmbeddedShowcase({
            children
        }) {
            return (
                <>
                    <ShowcaseEmbeddedProject project={project} />
                    {children}
                </>
            );
        },
    });

    return branchingSchema.current;
};

export { useBranchingSchema };
