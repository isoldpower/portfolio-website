import { BranchByType } from "@features/project/project-branching";
import { useBranchingSchema } from "./use-branching-schema.tsx";

import type { ClientLayoutPage } from "@shared/lib/types";
import type { ProjectPageData } from "../types.ts";


const ProjectPage: ClientLayoutPage<ProjectPageData> = ({
    project,
}) => {
    const branching = useBranchingSchema();

    return (
        <BranchByType project={project} schema={branching}>
            <div>Hello world</div>
        </BranchByType>
    );
}


export { ProjectPage };