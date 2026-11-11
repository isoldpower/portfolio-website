import { useTranslation } from "react-i18next";
import { JourneyScene } from "@entities/projects/journey-scene";
import { BURIED_CARROT, JOURNEY_LAYERS, JOURNEY_SPRITES } from "@entities/projects/visual-map";
import { useJourney, useJourneyMeadow } from "@features/projects/journey-scroll";
import { PixelSprite } from "@shared/ui-toolkit/pixel-sprite";

import { JourneyClouds } from "./scenery/journey-clouds.tsx";
import { JourneyMeadowScene } from "./scenery/journey-meadow-scene.tsx";
import { JourneyThemeScene } from "./scenery/journey-theme-scene.tsx";


function JourneyScenery() {
    const { t } = useTranslation();
    const { journeyStops } = useJourney();
    const { buriedCarrotX } = useJourneyMeadow();

    return (
        <>
            <JourneyMeadowScene>
                <JourneyClouds />
            </JourneyMeadowScene>
            {journeyStops.map((journeyStop, stopIndex) => (
                <JourneyThemeScene
                    key={journeyStop.key}
                    scene={String(stopIndex)}
                    theme={journeyStop.theme}
                >
                    <JourneyClouds />
                </JourneyThemeScene>
            ))}
            <JourneyScene.World className="bottom-22.5">
                <JourneyScene.WorldItem x={buriedCarrotX}>
                    <PixelSprite art={BURIED_CARROT} className="block" />
                </JourneyScene.WorldItem>
            </JourneyScene.World>
            <JourneyScene.Rabbit label={t("journey.rabbit")} />
            <JourneyScene.Ground />
            <JourneyScene.Layer
                src={JOURNEY_SPRITES.ground}
                height={JOURNEY_LAYERS.ground.height}
                parallax={JOURNEY_LAYERS.ground.parallax}
                className="pointer-events-none top-[672px]"
            />
        </>
    );
}

export { JourneyScenery };
