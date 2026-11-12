import { useCallback, useMemo } from "react";

import { PANEL_SHIFT } from "../constants.ts";
import { useJourney } from "../context/use-journey.ts";

import type { JourneyScreenshot, JourneyStop } from "@entities/projects/model";


interface JourneyScreenView {
    screenshot: JourneyScreenshot;
    shotMarker: string;
    isHidden: boolean;
}

interface JourneyViewLabel {
    viewMarker: string;
    labelText: string;
    isDimmed: boolean;
}

interface JourneyPanelView {
    journeyStop: JourneyStop;
    stopIndex: number;
    restOffset: number;
    isLive: boolean;
    showcasePath: string;
    screenAspectRatio: number | null;
    screenViews: readonly JourneyScreenView[];
    viewLabels: readonly JourneyViewLabel[];
}

type UseJourneyPanelsReturn = readonly JourneyPanelView[];

const useJourneyPanels = (): UseJourneyPanelsReturn => {
    const { journeyStops, journeyState } = useJourney();

    const screenshotMarkerOf = useCallback((stopIndex: number, screenshotOrder: number): string => {
        return `${String(stopIndex)}-${String(screenshotOrder)}`;
    }, []);

    const screenViewsOf = useCallback((journeyStop: JourneyStop, stopIndex: number): JourneyScreenView[] => {
        return journeyStop.screenshots.map((screenshot, screenshotOrder) => {
            return {
                screenshot,
                shotMarker: screenshotMarkerOf(stopIndex, screenshotOrder),
                isHidden: screenshotOrder > 0,
            };
        });
    }, [screenshotMarkerOf]);

    const viewLabelsOf = useCallback((journeyStop: JourneyStop, stopIndex: number): JourneyViewLabel[] => {
        if (journeyStop.screenshots.length < 2) {
            return [];
        }

        return journeyStop.screenshots.map((screenshot, screenshotOrder) => {
            return {
                viewMarker: screenshotMarkerOf(stopIndex, screenshotOrder),
                labelText: `0${String(screenshotOrder + 1)} / ${screenshot.label ?? ""}`,
                isDimmed: screenshotOrder > 0,
            };
        });
    }, [screenshotMarkerOf]);

    const panelViewOf = useCallback((journeyStop: JourneyStop, stopIndex: number): JourneyPanelView => {
        const [firstScreenshot] = journeyStop.screenshots;

        return {
            journeyStop,
            stopIndex,
            restOffset: PANEL_SHIFT,
            isLive: journeyState.livePanelIndex === stopIndex,
            showcasePath: `~/projects/${journeyStop.slug.replaceAll("-", "_")}`,
            screenAspectRatio: firstScreenshot ? firstScreenshot.width / firstScreenshot.height : null,
            screenViews: screenViewsOf(journeyStop, stopIndex),
            viewLabels: viewLabelsOf(journeyStop, stopIndex),
        };
    }, [journeyState.livePanelIndex, screenViewsOf, viewLabelsOf]);

    return useMemo(() => {
        return journeyStops.map(panelViewOf);
    }, [journeyStops, panelViewOf]);
};

export { useJourneyPanels };
export type { JourneyPanelView, JourneyScreenView, JourneyViewLabel, UseJourneyPanelsReturn };
