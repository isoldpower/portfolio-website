import { BranchByType } from "@features/projects/project-branching";
import { ProjectPageLayout } from "@processes/projects/project-page-layout";
import { WEB_INTEGRATIONS } from "./integrations-list.ts";
import { ProvidersWrapper } from "./wrappers/providers-wrapper.tsx";
import { useBranchingSchema } from "./wrappers/use-branching-schema.tsx";

import type { ProjectPageData } from "./types.ts";
import type { ClientLayoutPage } from "@shared/lib/types";


const ProjectPage: ClientLayoutPage<ProjectPageData> = ({
    project,
    neighbors,
}) => {
    const branching = useBranchingSchema();

    return (
        <ProvidersWrapper project={project} integrations={WEB_INTEGRATIONS}>
            <ProjectPageLayout project={project} neighbors={neighbors}>
                <BranchByType project={project} schema={branching} />
            </ProjectPageLayout>
        </ProvidersWrapper>
    );
};

export { ProjectPage };
