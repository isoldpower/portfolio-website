import { useRef } from "react";
import {
    ShowcaseEmbeddedProject,
    ShowcaseTerminalProject,
    ShowcaseWebProject
} from "@processes/project/project-type-layouts";

import type { BranchingSchema } from "@features/project/project-branching";
import {WebIntegrationWrapper} from "@features/integration/web-integration-registry";


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
            children,
        }) {
            return (
                <WebIntegrationWrapper>
                    <ShowcaseWebProject project={project} />
                    {children}
                </WebIntegrationWrapper>
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
