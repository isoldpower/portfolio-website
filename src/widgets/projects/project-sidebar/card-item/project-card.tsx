import { useTranslation } from "react-i18next";
import { ProjectRepoCard } from "@entities/projects/project-repo-card";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { AnimationComposer } from "@shared/lib/components";

import type { FC } from "react";
import type { RepoCard } from "@features/projects/source-repos";


interface ProjectCardProps {
    repo: RepoCard;
}

const ProjectCard: FC<ProjectCardProps> = ({ repo }) => {
    const { t } = useTranslation();

    return (
        <AnimationComposer key={repo.id}>
            <FocusOutline />
            <ProjectRepoCard
                href={repo.href}
                aria-label={t("project.sources_aria", { title: repo.title })}
            >
                <ProjectRepoCard.Title version={repo.version}>
                    {repo.title}
                </ProjectRepoCard.Title>
                <ProjectRepoCard.Path>
                    {repo.path}
                </ProjectRepoCard.Path>
                {repo.tech && (
                    <ProjectRepoCard.Tech>
                        {repo.tech}
                    </ProjectRepoCard.Tech>
                )}
            </ProjectRepoCard>
        </AnimationComposer>
    );
}

export { ProjectCard };