import { useTranslation } from "react-i18next";

import { JourneyTrack } from "@entities/projects/journey-track";
import { useJourneyCheckpoints } from "@features/projects/journey-scroll";

import { JourneyCheckpointItem } from "./checkpoints/journey-checkpoint-item.tsx";


function JourneyCheckpoints() {
    const { t } = useTranslation();
    const { progressPercent, isJourneyFinished, checkpointViews } = useJourneyCheckpoints();

    return (
        <JourneyTrack label={t("journey.track_label")}>
            <JourneyTrack.Progress
                label={t("journey.progress_label")}
                value={progressPercent}
            />
            {checkpointViews.map((checkpointView) => (
                <JourneyCheckpointItem
                    key={checkpointView.key}
                    checkpointView={checkpointView}
                />
            ))}
            <JourneyTrack.MiniCarrot
                label={t("journey.finish_marker")}
                isLit={isJourneyFinished
            } />
            <JourneyTrack.MiniRabbit
                label={t("journey.you_are_here")}
            />
        </JourneyTrack>
    );
}

export { JourneyCheckpoints };
