import { Fragment } from "react";

import { ProjectKindLabel } from "@entities/project";
import { UnorderedList } from "@shared/lib/components";
import { ExternalLinkIcon, GithubIcon, ImageIcon } from "@shared/ui-toolkit/icons";
import { BodyText, Caption, Heading, MetaText, PageTitle } from "@shared/ui-toolkit/typography";

import type { ProjectDetails, ProjectTechnology } from "@entities/project";


interface ProjectHeaderProps {
    project: ProjectDetails;
}

function TechnologyList({ technologies }: { technologies: ProjectTechnology[] }) {
    if (technologies.length === 0) {
        return null;
    }

    return (
        <UnorderedList>
            {technologies.map((technology) => (
                <Fragment key={technology._id}>
                    {technology.iconUrl ? (
                        <ImageIcon src={technology.iconUrl} title={technology.title} />
                    ) : null}
                    <Caption as="span">{technology.title}</Caption>
                </Fragment>
            ))}
        </UnorderedList>
    );
}

function ProjectHeader({
    project
}: ProjectHeaderProps) {
    return (
        <header>
            <ProjectKindLabel kind={project.kind} />
            <PageTitle>{project.title}</PageTitle>
            {project.summary ? <BodyText size="lg">{project.summary}</BodyText> : null}
            <TechnologyList technologies={project.extraTech} />
            {project.sourceRepos.length > 0 ? (
                <section>
                    <Heading size="lg">Source</Heading>
                    <UnorderedList>
                        {project.sourceRepos.map((repo) => (
                            <Fragment key={repo._id}>
                                <a href={repo.url} target="_blank" rel="noreferrer">
                                    <GithubIcon />
                                    {repo.title}
                                    <ExternalLinkIcon />
                                </a>
                                {" "}<MetaText>{repo.displayVersion}</MetaText>
                                <TechnologyList technologies={repo.techStack} />
                            </Fragment>
                        ))}
                    </UnorderedList>
                </section>
            ) : null}
        </header>
    );
}

export { ProjectHeader };
export type { ProjectHeaderProps };
