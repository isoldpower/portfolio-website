import { JourneyButton } from "@entities/projects/journey-button";
import { JourneyProjectInfo } from "@entities/projects/journey-project-info";
import { useLocalize } from "@features/localization/localized-value";
import { JourneyButtonHover } from "@features/projects/journey-animations";
import { NavigateToProject } from "@features/projects/navigation";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { AnimationComposer } from "@shared/lib/components";

import type { JourneyPanelView } from "@features/projects/journey-scroll";


interface JourneyProjectTextProps {
    panelView: JourneyPanelView;
}

function JourneyProjectText({ panelView }: JourneyProjectTextProps) {
    const localize = useLocalize();
    const { journeyStop } = panelView;

    return (
        <JourneyProjectInfo>
            <JourneyProjectInfo.District>
                {journeyStop.locationTitle}
            </JourneyProjectInfo.District>
            <JourneyProjectInfo.Title>
                {journeyStop.title}
            </JourneyProjectInfo.Title>
            <JourneyProjectInfo.Description>
                {localize(journeyStop.description)}</JourneyProjectInfo.Description>
            <JourneyProjectInfo.TechList>
                {journeyStop.tech.map((tech) => (
                    <JourneyProjectInfo.Tech key={tech}>
                        {tech}
                    </JourneyProjectInfo.Tech>
                ))}
            </JourneyProjectInfo.TechList>
            <AnimationComposer>
                <FocusOutline />
                <NavigateToProject slug={journeyStop.slug} className="inline-block">
                    <AnimationComposer>
                        <JourneyButtonHover />
                        <JourneyButton>
                            _t(journey.explore)
                        </JourneyButton>
                    </AnimationComposer>
                </NavigateToProject>
            </AnimationComposer>
        </JourneyProjectInfo>
    );
}

export { JourneyProjectText };
export type { JourneyProjectTextProps };
