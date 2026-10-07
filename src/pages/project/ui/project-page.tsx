import { BranchByType } from "@features/project/project-branching";
import { useBranchingSchema } from "./use-branching-schema.tsx";

import type { ClientLayoutPage } from "@shared/lib/types";
import type { ProjectPageData } from "../types.ts";


const ProjectPage: ClientLayoutPage<ProjectPageData> = ({
    project,
}) => {
    const branching = useBranchingSchema();

    return (
        <div className="flex flex-row">
            <aside className="flex-1/4 border-r-2 h-dvh border-gray-300">
                This is sidebar
            </aside>
            <section className="flex-3/4 p-4">
                <BranchByType project={project} schema={branching} />
            </section>
        </div>
    );
}


export { ProjectPage };