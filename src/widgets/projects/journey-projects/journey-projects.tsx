import { JourneyPanels } from "@entities/projects/journey-panels";
import { useJourneyPanels } from "@features/projects/journey-scroll";

import { JourneyProjectShowcase } from "./project/journey-project-showcase.tsx";
import { JourneyProjectText } from "./project/journey-project-text.tsx";


function JourneyProjects() {
    const panelViews = useJourneyPanels();

    return (
        <JourneyPanels>
            {panelViews.map((panelView) => (
                <JourneyPanels.Item
                    key={panelView.journeyStop.key}
                    index={panelView.stopIndex}
                    restOffset={panelView.restOffset}
                    isLive={panelView.isLive}
                >
                    <JourneyProjectText panelView={panelView} />
                    <JourneyProjectShowcase panelView={panelView} />
                </JourneyPanels.Item>
            ))}
        </JourneyPanels>
    );
}

export { JourneyProjects };
