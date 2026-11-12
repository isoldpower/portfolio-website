import { JourneyTrackMiniCarrot } from "./track/journey-track-mini-carrot.tsx";
import { JourneyTrackMiniRabbit } from "./track/journey-track-mini-rabbit.tsx";
import { JourneyTrackProgress } from "./track/journey-track-progress.tsx";

import type { JourneyTrackMiniCarrotProps } from "./track/journey-track-mini-carrot.tsx";
import type { JourneyTrackMiniRabbitProps } from "./track/journey-track-mini-rabbit.tsx";
import type { JourneyTrackProgressProps } from "./track/journey-track-progress.tsx";
import type { FC, ReactNode } from "react";


interface JourneyTrackProps {
    label: string;
    children: ReactNode;
}

type JourneyTrackObject = FC<JourneyTrackProps> & {
    Progress: FC<JourneyTrackProgressProps>;
    MiniRabbit: FC<JourneyTrackMiniRabbitProps>;
    MiniCarrot: FC<JourneyTrackMiniCarrotProps>;
};

const JourneyTrack: JourneyTrackObject = ({ label, children }) => {
    return (
        <nav aria-label={label} className="relative mt-3.5 h-13">
            {children}
        </nav>
    );
};

JourneyTrack.Progress = JourneyTrackProgress;
JourneyTrack.MiniRabbit = JourneyTrackMiniRabbit;
JourneyTrack.MiniCarrot = JourneyTrackMiniCarrot;
JourneyTrack.displayName = "JourneyTrack";

export { JourneyTrack };
export type { JourneyTrackProps };
