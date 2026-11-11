import { ProjectBrowser } from "@entities/projects/project-browser";
import { useBrowserCards } from "@features/projects/project-browser";

import { ProjectBrowserCard } from "./cards/project-browser-card.tsx";
import { ProjectBrowserFillerCard } from "./cards/project-browser-filler-card.tsx";


function ProjectBrowserGrid() {
    const { cardViews, fillerCount, statusText, isEmpty } = useBrowserCards();

    return (
        <>
            <ProjectBrowser.Status>
                {statusText}
            </ProjectBrowser.Status>
            {isEmpty && (
                <ProjectBrowser.Empty>
                    _t(browser.empty)
                </ProjectBrowser.Empty>
            )}
            {!isEmpty && (
                <ProjectBrowser.Grid>
                    {cardViews.map((cardView) => (
                        <ProjectBrowserCard key={cardView.project.key} cardView={cardView} />
                    ))}
                    {Array.from({ length: fillerCount }, (_, fillerIndex) => (
                        <ProjectBrowserFillerCard key={`filler-${String(fillerIndex)}`} />
                    ))}
                </ProjectBrowser.Grid>
            )}
        </>
    );
}

export { ProjectBrowserGrid };
