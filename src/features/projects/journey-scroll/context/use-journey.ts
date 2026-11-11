import { useContext } from "react";

import { JourneyContext } from "./journey-context.ts";

import type { JourneyContextValue } from "../types.ts";


type UseJourneyReturn = JourneyContextValue;

const useJourney = (): UseJourneyReturn => {
    const journeyContextValue = useContext(JourneyContext);
    if (!journeyContextValue) {
        throw new Error("useJourney must be used inside JourneyProvider");
    }

    return journeyContextValue;
};

export { useJourney };
export type { UseJourneyReturn };
