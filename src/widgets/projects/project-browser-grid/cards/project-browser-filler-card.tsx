import { JourneyButton } from "@entities/projects/journey-button";
import { ProjectCard } from "@entities/projects/project-card";


const EMPTY_LINE = " ";

function ProjectBrowserFillerCard() {
    return (
        <ProjectCard isFiller>
            <ProjectCard.Preview />
            <ProjectCard.Kind>{EMPTY_LINE}</ProjectCard.Kind>
            <ProjectCard.Title>{EMPTY_LINE}</ProjectCard.Title>
            <ProjectCard.Description>{EMPTY_LINE}</ProjectCard.Description>
            <ProjectCard.Tech>{EMPTY_LINE}</ProjectCard.Tech>
            <ProjectCard.Action>
                <JourneyButton className="px-4 py-2 text-sm">{EMPTY_LINE}</JourneyButton>
            </ProjectCard.Action>
        </ProjectCard>
    );
}

export { ProjectBrowserFillerCard };
