import { UnorderedList } from "@shared/lib/components";
import { PageTitle } from "@shared/ui-toolkit/typography";
import { ProjectPreviewCard } from "@widgets/project/project-preview-card";
import { ProtectEmptyPreviews } from "@features/project/fetch-experience";

import type { HomePageData } from "@pages/home/types.ts";
import type { ClientLayoutPage } from "@shared/lib/types";


const HomePage: ClientLayoutPage<HomePageData> = ({
    projects,
}) => {
    return (
        <>
            <PageTitle className="mb-4">
                Projects
            </PageTitle>
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
