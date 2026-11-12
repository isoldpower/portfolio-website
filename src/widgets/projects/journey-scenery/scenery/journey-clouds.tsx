import { JourneyScene } from "@entities/projects/journey-scene";
import { JOURNEY_LAYERS, JOURNEY_SPRITES } from "@entities/projects/visual-map";
import { SceneryDrift } from "@features/projects/journey-animations";
import { AnimationComposer } from "@shared/lib/components";


function JourneyClouds() {
    return (
        <AnimationComposer>
            <SceneryDrift />
            <JourneyScene.Layer
                src={JOURNEY_SPRITES.clouds}
                height={JOURNEY_LAYERS.clouds.height}
                parallax={JOURNEY_LAYERS.clouds.parallax}
                isWide
            />
        </AnimationComposer>
    );
}

export { JourneyClouds };
