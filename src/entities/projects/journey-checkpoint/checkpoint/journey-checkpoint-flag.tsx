import { PixelSprite } from "@shared/ui-toolkit/pixel-sprite";
import { FLAG_SPRITES } from "../../visual-map";

import type { FC, ReactNode } from "react";


interface JourneyCheckpointFlagProps {
    isPending: boolean;
    children?: ReactNode;
}

const JourneyCheckpointFlag: FC<JourneyCheckpointFlagProps> = ({ isPending, children }) => {
    return (
        <span data-flag className="absolute bottom-6 left-14.75 h-5 w-4">
            <PixelSprite
                art={isPending ? FLAG_SPRITES.pending : FLAG_SPRITES.reached}
                className="absolute bottom-0 left-0"
            />
            {isPending && (
                <PixelSprite
                    data-preview
                    art={FLAG_SPRITES.preview}
                    className="absolute bottom-0 left-0 bg-background opacity-0"
                />
            )}
            {children}
        </span>
    );
};

JourneyCheckpointFlag.displayName = "JourneyCheckpointFlag";

export { JourneyCheckpointFlag };
export type { JourneyCheckpointFlagProps };
