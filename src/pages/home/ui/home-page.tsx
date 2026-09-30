import { getRouteApi } from "@tanstack/react-router";

import { UnorderedList } from "@shared/lib/components";
import { PageTitle } from "@shared/ui-toolkit/typography";
import { ProtectEmptyPreviews } from "@features/project";
import { ProjectPreviewCard } from "@widgets/project-preview-card";


const routeApi = getRouteApi("/");

function HomePage() {
    const { projects } = routeApi.useLoaderData();

    return (
        <>
            <PageTitle className="mb-4">Projects</PageTitle>
            <ProtectEmptyPreviews previews={projects}>
                <UnorderedList className="grid grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <ProjectPreviewCard key={project._id} project={project} />
                    ))}
                </UnorderedList>
            </ProtectEmptyPreviews>
        </>
    );
}

export { HomePage };
