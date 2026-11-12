import { ProjectNavigation } from "@entities/projects/project-kind";
import { NavigateToProject } from "@features/projects/navigation";
import { CardTitle } from "@shared/ui-toolkit/typography";

import type { ProjectPreview } from "@entities/projects/model";


interface ProjectPreviewCardProps {
    project: Pick<ProjectPreview, "title" | "slug">;
    className?: string;
}

function ProjectPreviewCard({
    project,
    className
}: ProjectPreviewCardProps) {
    return (
        <NavigateToProject slug={project.slug} className="block outline-none">
            <ProjectNavigation className={className}>
                <CardTitle as="span">{project.title}</CardTitle>
            </ProjectNavigation>
        </NavigateToProject>
    );
}

export { ProjectPreviewCard };
export type { ProjectPreviewCardProps };
