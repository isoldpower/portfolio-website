import { ProjectPage } from "@entities/projects/project-page";
import { ProjectRepoCard } from "@entities/projects/project-repo-card";
import { useLocalize } from "@features/localization/localized-value";
import { useRepoCards } from "@features/projects/source-repos";
import { ProjectCard } from "./card-item/project-card.tsx";
import { ProjectDescriptionGroup } from "./card-item/project-description-group.tsx";

import type { ProjectDetails } from "@entities/projects/model";


interface ProjectSidebarProps {
    project: ProjectDetails;
}

function ProjectSidebar({ project }: ProjectSidebarProps) {
    const localize = useLocalize();
    const repoCards = useRepoCards(project.sourceRepos);
    const reflection = localize(project.story.reflection);

    return (
        <ProjectPage.Sidebar>
            <ProjectPage.SidebarHeader kicker="_t(project.kicker)">
                {project.title}
            </ProjectPage.SidebarHeader>
            {repoCards.length > 0 && (
                <ProjectRepoCard.List title="_t(project.sources)">
                    {repoCards.map((repo) => (
                        <ProjectCard repo={repo} key={repo.id} />
                    ))}
                </ProjectRepoCard.List>
            )}
            <ProjectDescriptionGroup project={project} />
            {reflection && (
                <ProjectPage.SidebarGroup>
                    <ProjectPage.SidebarSection title="_t(project.reflection)">
                        {reflection}
                    </ProjectPage.SidebarSection>
                </ProjectPage.SidebarGroup>
            )}
        </ProjectPage.Sidebar>
    );
}

export { ProjectSidebar };
export type { ProjectSidebarProps };
