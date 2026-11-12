import { JourneyShowcase } from "@entities/projects/journey-showcase";
import { useLocalize } from "@features/localization/localized-value";

import type { JourneyPanelView } from "@features/projects/journey-scroll";


interface JourneyProjectShowcaseProps {
    panelView: JourneyPanelView;
}

function JourneyProjectShowcase({ panelView }: JourneyProjectShowcaseProps) {
    const localize = useLocalize();
    const { journeyStop } = panelView;

    return (
        <JourneyShowcase>
            <JourneyShowcase.Caption>
                {panelView.showcasePath}
            </JourneyShowcase.Caption>
            {panelView.screenAspectRatio === null && (
                <JourneyShowcase.Placeholder>
                    <JourneyShowcase.PlaceholderTitle>
                        {`[ ${journeyStop.checkpoint} ]`}
                    </JourneyShowcase.PlaceholderTitle>
                    <JourneyShowcase.PlaceholderNote>_t(journey.no_preview)</JourneyShowcase.PlaceholderNote>
                </JourneyShowcase.Placeholder>
            )}
            {panelView.screenAspectRatio !== null && (
                <JourneyShowcase.Screens aspectRatio={panelView.screenAspectRatio}>
                    {panelView.screenViews.map((screenView) => (
                        <JourneyShowcase.Screen
                            key={screenView.screenshot.key}
                            marker={screenView.shotMarker}
                            src={screenView.screenshot.src}
                            alt={localize(screenView.screenshot.alt) || journeyStop.title}
                            width={screenView.screenshot.width}
                            height={screenView.screenshot.height}
                            isHidden={screenView.isHidden}
                        />
                    ))}
                </JourneyShowcase.Screens>
            )}
            {panelView.viewLabels.length > 0 && (
                <JourneyShowcase.ViewLabels>
                    {panelView.viewLabels.map((viewLabel) => (
                        <JourneyShowcase.ViewLabel
                            key={viewLabel.viewMarker}
                            marker={viewLabel.viewMarker}
                            isDimmed={viewLabel.isDimmed}
                        >
                            {viewLabel.labelText}
                        </JourneyShowcase.ViewLabel>
                    ))}
                </JourneyShowcase.ViewLabels>
            )}
        </JourneyShowcase>
    );
}

export { JourneyProjectShowcase };
export type { JourneyProjectShowcaseProps };
