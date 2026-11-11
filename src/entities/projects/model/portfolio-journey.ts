import type { LocalizedValue } from "@shared/lib/i18n";


const JOURNEY_THEMES = ["finance", "warships", "network"] as const;

const MAX_JOURNEY_STOPS = 3;

type JourneyTheme = (typeof JOURNEY_THEMES)[number];

interface JourneyScreenshot {
    key: string;
    src: string;
    width: number;
    height: number;
    label: string | null;
    alt: LocalizedValue;
}

interface JourneyStop {
    key: string;
    slug: string;
    title: string;
    theme: JourneyTheme;
    locationTitle: string;
    checkpoint: string;
    description: LocalizedValue;
    tech: string[];
    screenshots: JourneyScreenshot[];
}

interface PortfolioJourney {
    stops: JourneyStop[];
}

export { JOURNEY_THEMES, MAX_JOURNEY_STOPS };
export type { JourneyScreenshot, JourneyStop, JourneyTheme, PortfolioJourney };
