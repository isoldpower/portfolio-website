import { cn } from "@shared/lib/utilities";
import { PixelSprite } from "@shared/ui-toolkit/pixel-sprite";
import { FLAG_SPRITES } from "../../visual-map";
import { WAVE_STYLE } from "../constants.ts";

import type { FC } from "react";


interface JourneyCheckpointWavingFlagProps {
    className?: string;
}

const JourneyCheckpointWavingFlag: FC<JourneyCheckpointWavingFlagProps> = ({ className }) => {
    return (
        <PixelSprite
            art={FLAG_SPRITES.waving}
            className={cn(
                "absolute bottom-0 left-0 bg-background motion-reduce:hidden",
                className
            )}
            style={WAVE_STYLE}
        />
    );
};

JourneyCheckpointWavingFlag.displayName = "JourneyCheckpointWavingFlag";

export { JourneyCheckpointWavingFlag };
export type { JourneyCheckpointWavingFlagProps };
