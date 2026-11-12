import { ProjectPage } from "@entities/projects/project-page";
import { useLocalize } from "@features/localization/localized-value";

import type { FC } from "react";
import type { ProjectDetails } from "@entities/projects/model";


interface ProjectDescriptionGroupProps {
    project: ProjectDetails;
}

const ProjectDescriptionGroup: FC<ProjectDescriptionGroupProps> = ({ project }) => {
    const localize = useLocalize();
    const roles = localize(project.story.roles);
    const context = localize(project.story.context);

    return (roles || context) && (
        <ProjectPage.SidebarGroup>
            {roles && (
                <ProjectPage.SidebarSection title="_t(project.roles)">
                    {roles}
                </ProjectPage.SidebarSection>
            )}
            {context && (
                <ProjectPage.SidebarSection title="_t(project.context)">
                    {context}
                </ProjectPage.SidebarSection>
            )}
        </ProjectPage.SidebarGroup>
    );
}

export { ProjectDescriptionGroup };