import { ProjectPage } from "@entities/projects/project-page";
import { ProjectPager } from "@widgets/projects/project-pager";
import { ProjectSidebar } from "@widgets/projects/project-sidebar";

import type { ProjectDetails, ProjectNeighbors } from "@entities/projects/model";
import type { ReactNode } from "react";


interface ProjectPageLayoutProps {
    project: ProjectDetails;
    neighbors: ProjectNeighbors;
    children: ReactNode;
}

function ProjectPageLayout({ project, neighbors, children }: ProjectPageLayoutProps) {
    return (
        <ProjectPage>
            <ProjectSidebar project={project} />
            <ProjectPage.Main>
                <ProjectPage.Scroll>
                    <ProjectPage.Intro>
                        _t(project.intro.{project.kind})
                    </ProjectPage.Intro>
                    <ProjectPage.Content>
                        {children}
                    </ProjectPage.Content>
                </ProjectPage.Scroll>
                <ProjectPager neighbors={neighbors} />
            </ProjectPage.Main>
        </ProjectPage>
    );
}

export { ProjectPageLayout };
export type { ProjectPageLayoutProps };
