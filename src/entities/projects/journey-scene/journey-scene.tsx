import { cn } from "@shared/lib/utilities";

import { JourneySceneGround } from "./scene/journey-scene-ground.tsx";
import { JourneySceneHills } from "./scene/journey-scene-hills.tsx";
import { JourneySceneLayer } from "./scene/journey-scene-layer.tsx";
import { JourneySceneRabbit } from "./scene/journey-scene-rabbit.tsx";
import { JourneySceneWorldItem } from "./scene/journey-scene-world-item.tsx";
import { JourneySceneWorld } from "./scene/journey-scene-world.tsx";

import type { JourneySceneGroundProps } from "./scene/journey-scene-ground.tsx";
import type { JourneySceneHillsProps } from "./scene/journey-scene-hills.tsx";
import type { JourneySceneLayerProps } from "./scene/journey-scene-layer.tsx";
import type { JourneySceneRabbitProps } from "./scene/journey-scene-rabbit.tsx";
import type { JourneySceneWorldItemProps } from "./scene/journey-scene-world-item.tsx";
import type { JourneySceneWorldProps } from "./scene/journey-scene-world.tsx";
import type { FC, ReactNode } from "react";


interface JourneySceneProps {
    scene: string;
    isInitiallyVisible?: boolean;
    children: ReactNode;
}

type JourneySceneObject = FC<JourneySceneProps> & {
    Layer: FC<JourneySceneLayerProps>;
    Hills: FC<JourneySceneHillsProps>;
    World: FC<JourneySceneWorldProps>;
    WorldItem: FC<JourneySceneWorldItemProps>;
    Rabbit: FC<JourneySceneRabbitProps>;
    Ground: FC<JourneySceneGroundProps>;
};

const JourneyScene: JourneySceneObject = ({
    scene,
    isInitiallyVisible = false,
    children
}) => {
    return (
        <div
            data-journey-scene={scene}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-x-0 top-92.5 h-75 overflow-hidden",
                !isInitiallyVisible && "opacity-0"
            )}
        >
            {children}
        </div>
    );
};

JourneyScene.Layer = JourneySceneLayer;
JourneyScene.Hills = JourneySceneHills;
JourneyScene.World = JourneySceneWorld;
JourneyScene.WorldItem = JourneySceneWorldItem;
JourneyScene.Rabbit = JourneySceneRabbit;
JourneyScene.Ground = JourneySceneGround;
JourneyScene.displayName = "JourneyScene";

export { JourneyScene };
export type { JourneySceneProps };
