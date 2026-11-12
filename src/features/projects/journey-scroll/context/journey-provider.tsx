import { useMemo, useRef } from "react";

import { useStageFit } from "../layout/use-stage-fit.ts";
import { useJourneyScroll } from "../use-journey-scroll.ts";
import { JourneyContext } from "./journey-context.ts";

import type { JourneyStop } from "@entities/projects/model";
import type { FC, ReactNode } from "react";


interface JourneyProviderProps {
    journeyStops: readonly JourneyStop[];
    skipTargetHref: string;
    children: ReactNode;
}

const JourneyProvider: FC<JourneyProviderProps> = ({ journeyStops, skipTargetHref, children }) => {
    const stageRef = useRef<HTMLDivElement>(null);
    const { journeyState, jumpToStop } = useJourneyScroll({ stageRef, stopCount: journeyStops.length });

    useStageFit(stageRef);

    const journeyContextValue = useMemo(() => {
        return { journeyStops, stageRef, journeyState, skipTargetHref, jumpToStop };
    }, [journeyStops, journeyState, skipTargetHref, jumpToStop]);

    return (
        <JourneyContext value={journeyContextValue}>
            {children}
        </JourneyContext>
    );
};

JourneyProvider.displayName = "JourneyProvider";

export { JourneyProvider };
export type { JourneyProviderProps };
