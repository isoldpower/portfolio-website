import { HILL_TILE_WIDTH } from "../../visual-map";

import type { CSSProperties, FC } from "react";
import {cn} from "@shared/lib/utilities";


interface JourneySceneHillsProps {
    src: string;
    height: number;
    parallax: number;
}

const JourneySceneHills: FC<JourneySceneHillsProps> = ({ src, height, parallax }) => {
    const style = {
        height,
        backgroundImage: `url("${src}")`,
        backgroundSize: `${String(HILL_TILE_WIDTH)}px ${String(height)}px`,
        "--parallax": parallax,
    } as CSSProperties;

    return (
        <div
            className={cn(
                "absolute inset-x-0 bottom-0 bg-repeat-x",
                "[background-position-x:round(calc(var(--journey-cam)*var(--parallax)*-1px),2px)]"
            )}
            style={style}
        />
    );
};

JourneySceneHills.displayName = "JourneySceneHills";

export { JourneySceneHills };
export type { JourneySceneHillsProps };
