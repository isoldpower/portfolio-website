import { BranchByType } from "@features/project/project-branching";
import { ProvidersWrapper } from "./ui/providers-wrapper.tsx";
import { useBranchingSchema } from "./ui/use-branching-schema.tsx";
import { WEB_INTEGRATIONS } from "./integrations-list.ts";

import type { ClientLayoutPage } from "@shared/lib/types";
import type { ProjectPageData } from "./types.ts";


const ProjectPage: ClientLayoutPage<ProjectPageData> = ({
    project,
}) => {
    const branching = useBranchingSchema();

    return (
        <ProvidersWrapper project={project} integrations={WEB_INTEGRATIONS}>
            <div className="flex flex-row">
                <aside className="flex-1/4 border-r-2 h-dvh sticky left-0 top-0 bottom-0 border-gray-300">
                    This is sidebar
                </aside>
                <section className="flex-3/4 min-w-0 p-4">
                    <BranchByType
                        project={project}
                        schema={branching}
                    />
                </section>
            </div>
        </ProvidersWrapper>
    );
}


export { ProjectPage };