import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ProjectPage } from "@entities/projects/project-page";
import { NavigateToProject } from "@features/projects/navigation";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { LinkHover } from "@features/site-artwork/link-hover";
import { AnimationComposer } from "@shared/lib/components";

import type { ProjectLink, ProjectNeighbors } from "@entities/projects/model";


interface ProjectPagerProps {
    neighbors: ProjectNeighbors;
}

function ProjectPager({ neighbors }: ProjectPagerProps) {
    const { t } = useTranslation();

    const buildNavigationButton = useCallback((
        link: ProjectLink,
        forward: boolean
    ) => (
        <AnimationComposer>
            <FocusOutline />
            <NavigateToProject slug={link.slug} className="inline-block">
                <AnimationComposer>
                    <LinkHover />
                    <span
                        aria-label={t(
                            forward ? "project.next_aria" : "project.previous_aria",
                            { title: link.title }
                        )}
                    >
                        <ProjectPage.PagerLabel direction={forward ? "next" : "previous"}>
                            {forward ? "_t(project.next)" : "_t(project.previous)"}
                        </ProjectPage.PagerLabel>
                    </span>
                </AnimationComposer>
            </NavigateToProject>
        </AnimationComposer>
    ), []);

    return (neighbors.previous || neighbors.next) && (
        <ProjectPage.Pager label={t("project.pager_label")}>
            {neighbors.previous && buildNavigationButton(neighbors.previous, false)}
            {neighbors.next && buildNavigationButton(neighbors.next, true)}
        </ProjectPage.Pager>
    );
}

export { ProjectPager };
export type { ProjectPagerProps };
