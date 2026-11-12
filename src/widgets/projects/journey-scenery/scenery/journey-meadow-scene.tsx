import { JourneyScene } from "@entities/projects/journey-scene";
import { JOURNEY_HILLS, MEADOW_SPRITES } from "@entities/projects/visual-map";
import { useJourneyMeadow } from "@features/projects/journey-scroll";
import { PixelSprite } from "@shared/ui-toolkit/pixel-sprite";

import type { ReactNode } from "react";


interface JourneyMeadowSceneProps {
    children?: ReactNode;
}

function JourneyMeadowScene({ children }: JourneyMeadowSceneProps) {
    const { meadowItems } = useJourneyMeadow();

    return (
        <JourneyScene scene="meadow" isInitiallyVisible>
            {children}
            {JOURNEY_HILLS.map((journeyHill) => (
                <JourneyScene.Hills
                    key={journeyHill.height}
                    src={journeyHill.url}
                    height={journeyHill.height}
                    parallax={journeyHill.parallax}
                />
            ))}
            <JourneyScene.World className="bottom-0">
                {meadowItems.map((meadowItem) => (
                    <JourneyScene.WorldItem key={meadowItem.key} x={meadowItem.worldX}>
                        <PixelSprite art={MEADOW_SPRITES[meadowItem.spriteName]} className="block" />
                    </JourneyScene.WorldItem>
                ))}
            </JourneyScene.World>
        </JourneyScene>
    );
}

export { JourneyMeadowScene };
export type { JourneyMeadowSceneProps };
