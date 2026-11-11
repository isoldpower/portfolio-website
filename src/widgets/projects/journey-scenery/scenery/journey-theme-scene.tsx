import { JourneyScene } from "@entities/projects/journey-scene";
import { JOURNEY_LAYERS, THEME_SPRITES } from "@entities/projects/visual-map";
import { SceneryBlink } from "@features/projects/journey-animations";
import { AnimationComposer } from "@shared/lib/components";

import type { JourneyTheme } from "@entities/projects/model";
import type { ReactNode } from "react";


interface JourneyThemeSceneProps {
    scene: string;
    theme: JourneyTheme;
    children?: ReactNode;
}

function JourneyThemeScene({ scene, theme, children }: JourneyThemeSceneProps) {
    const themeSprites = THEME_SPRITES[theme];

    return (
        <JourneyScene scene={scene}>
            {children}
            <JourneyScene.Layer
                src={themeSprites.far}
                height={themeSprites.height}
                parallax={JOURNEY_LAYERS.far.parallax}
            />
            <JourneyScene.Layer
                src={themeSprites.nearB}
                height={themeSprites.height}
                parallax={JOURNEY_LAYERS.near.parallax}
            />
            <AnimationComposer>
                <SceneryBlink />
                <JourneyScene.Layer
                    src={themeSprites.nearA}
                    height={themeSprites.height}
                    parallax={JOURNEY_LAYERS.near.parallax}
                    blinkSeconds={themeSprites.blinkSeconds}
                />
            </AnimationComposer>
            <JourneyScene.Layer
                src={themeSprites.mid}
                height={JOURNEY_LAYERS.mid.height}
                parallax={JOURNEY_LAYERS.mid.parallax}
            />
        </JourneyScene>
    );
}

export { JourneyThemeScene };
export type { JourneyThemeSceneProps };
