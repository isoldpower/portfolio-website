import { JourneyButton } from "@entities/projects/journey-button";
import { ProjectCard } from "@entities/projects/project-card";
import { JourneyButtonHover } from "@features/projects/journey-animations";
import { NavigateToProject } from "@features/projects/navigation";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { AnimationComposer } from "@shared/lib/components";

import type { BrowserCardView } from "@features/projects/project-browser";


interface ProjectBrowserCardProps {
    cardView: BrowserCardView;
}

function ProjectBrowserCard({ cardView }: ProjectBrowserCardProps) {
    const { project: browsedProject } = cardView;

    return (
        <ProjectCard>
            <ProjectCard.Preview>
                {browsedProject.image ? (
                    <ProjectCard.Image
                        src={browsedProject.image.src}
                        srcSet={browsedProject.image.srcSet}
                        width={browsedProject.image.width}
                        height={browsedProject.image.height}
                        alt={cardView.imageAlt}
                    />
                ) : (
                    <ProjectCard.Placeholder>
                        <ProjectCard.PlaceholderTitle>
                            {cardView.placeholderTitle}
                        </ProjectCard.PlaceholderTitle>
                        <ProjectCard.PlaceholderNote>
                            _t(browser.no_preview)
                        </ProjectCard.PlaceholderNote>
                    </ProjectCard.Placeholder>
                )}
            </ProjectCard.Preview>
            <ProjectCard.Kind>
                {cardView.kindLabel}
            </ProjectCard.Kind>
            <ProjectCard.Title>
                {browsedProject.title}
            </ProjectCard.Title>
            <ProjectCard.Description>
                {cardView.descriptionText}
            </ProjectCard.Description>
            <ProjectCard.Tech>
                {cardView.techText}
            </ProjectCard.Tech>
            <ProjectCard.Action>
                <AnimationComposer>
                    <FocusOutline />
                    <NavigateToProject slug={browsedProject.slug} className="inline-block">
                        <AnimationComposer>
                            <JourneyButtonHover />
                            <JourneyButton className="px-4 py-2 text-sm">
                                _t(browser.visit)
                            </JourneyButton>
                        </AnimationComposer>
                    </NavigateToProject>
                </AnimationComposer>
            </ProjectCard.Action>
        </ProjectCard>
    );
}

export { ProjectBrowserCard };
export type { ProjectBrowserCardProps };
