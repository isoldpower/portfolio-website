import { PixelSprite } from "@shared/ui-toolkit/pixel-sprite";

import { MINI_RABBIT } from "../../visual-map";

import type { FC } from "react";
import {cn} from "@shared/lib/utilities";


interface JourneyTrackMiniRabbitProps {
    label: string;
}

const JourneyTrackMiniRabbit: FC<JourneyTrackMiniRabbitProps> = ({ label }) => {
    return (
        <PixelSprite
            data-journey="mini-rabbit"
            data-hop="false"
            art={MINI_RABBIT}
            label={label}
            className={cn(
                "pointer-events-none absolute bottom-6 left-0 -ml-4.5 data-[hop=true]:bottom-6.5",
                "in-data-[direction=backward]:-scale-x-100"
            )}
        />
    );
};

JourneyTrackMiniRabbit.displayName = "JourneyTrackMiniRabbit";

export { JourneyTrackMiniRabbit };
export type { JourneyTrackMiniRabbitProps };
