import { cn } from "@shared/lib/utilities";

import { LAYER_PIXEL_SCALE, LAYER_TILE_WIDTH } from "../constants.ts";

import type { CSSProperties, FC } from "react";


interface JourneySceneLayerProps {
    src: string;
    height: number;
    parallax: number;
    blinkSeconds?: number;
    isWide?: boolean;
    className?: string;
}

const JourneySceneLayer: FC<JourneySceneLayerProps> = ({
    src,
    height,
    parallax,
    blinkSeconds,
    isWide = false,
    className
}) => {
    const scaledHeight = height * LAYER_PIXEL_SCALE;
    const style = {
        height: scaledHeight,
        backgroundImage: `url("${src}")`,
        backgroundSize: `${String(LAYER_TILE_WIDTH)}px ${String(scaledHeight)}px`,
        "--parallax": parallax,
        "--blink-duration": blinkSeconds ? `${String(blinkSeconds)}s` : undefined,
    } as CSSProperties;

    return (
        <div
            className={cn(
                "absolute top-0 left-0 bg-repeat-x [image-rendering:pixelated]",
                "[background-position-x:round(calc(var(--journey-cam)*var(--parallax)*-1px),2px)]",
                isWide ? "w-[calc(100%+1792px)]" : "right-0",
                className
            )}
            style={style}
        />
    );
};

JourneySceneLayer.displayName = "JourneySceneLayer";

export { JourneySceneLayer };
export type { JourneySceneLayerProps };
