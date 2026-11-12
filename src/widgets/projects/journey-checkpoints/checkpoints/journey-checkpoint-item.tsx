import { JourneyCheckpoint } from "@entities/projects/journey-checkpoint";
import { CheckpointHover, SceneryBlink } from "@features/projects/journey-animations";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { AnimationComposer } from "@shared/lib/components";

import type { JourneyCheckpointView } from "@features/projects/journey-scroll";


interface JourneyCheckpointItemProps {
    checkpointView: JourneyCheckpointView;
}

function JourneyCheckpointItem({ checkpointView }: JourneyCheckpointItemProps) {
    const isPending = checkpointView.checkpointState === "pending";

    return (
        <AnimationComposer>
            <CheckpointHover />
            <FocusOutline />
            <JourneyCheckpoint
                position={checkpointView.trackPosition}
                state={checkpointView.checkpointState}
                aria-label={checkpointView.ariaLabel}
                onClick={checkpointView.jumpToCheckpoint}
            >
                <JourneyCheckpoint.Flag isPending={isPending}>
                    {checkpointView.checkpointState === "current" ? (
                        <AnimationComposer>
                            <SceneryBlink />
                            <JourneyCheckpoint.WavingFlag />
                        </AnimationComposer>
                    ) : null}
                </JourneyCheckpoint.Flag>
                <JourneyCheckpoint.Label isPending={isPending}>{checkpointView.checkpointName}</JourneyCheckpoint.Label>
            </JourneyCheckpoint>
        </AnimationComposer>
    );
}

export { JourneyCheckpointItem };
export type { JourneyCheckpointItemProps };
