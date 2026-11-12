import { PixelSprite } from "@shared/ui-toolkit/pixel-sprite";
import { MINI_CARROT } from "../../visual-map";

import type { FC } from "react";


interface JourneyTrackMiniCarrotProps {
    label: string;
    isLit: boolean;
}

const JourneyTrackMiniCarrot: FC<JourneyTrackMiniCarrotProps> = ({ label, isLit }) => {
    return (
        <PixelSprite
            art={isLit ? MINI_CARROT.lit : MINI_CARROT.dim}
            label={label}
            className="absolute -right-4 bottom-6"
        />
    );
};

JourneyTrackMiniCarrot.displayName = "JourneyTrackMiniCarrot";

export { JourneyTrackMiniCarrot };
export type { JourneyTrackMiniCarrotProps };
