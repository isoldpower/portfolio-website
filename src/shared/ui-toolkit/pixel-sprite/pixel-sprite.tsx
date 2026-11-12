import { PIXEL_SCALE } from "./constants.ts";

import type { PixelArt } from "./types.ts";
import type { FC, SVGAttributes } from "react";


type PixelSpriteProps = Omit<SVGAttributes<SVGSVGElement>, "children"> & {
    art: PixelArt;
    label?: string;
};

const PixelSprite: FC<PixelSpriteProps> = ({ art, label, ...props }) => {
    return (
        <svg
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            viewBox={`0 0 ${String(art.width)} ${String(art.height)}`}
            width={art.width * PIXEL_SCALE}
            height={art.height * PIXEL_SCALE}
            shapeRendering="crispEdges"
            {...props}
        >
            {art.layers.map((layer) => (
                <path key={layer.fill} d={layer.d} fill={layer.fill} />
            ))}
        </svg>
    );
};

PixelSprite.displayName = "PixelSprite";

export { PixelSprite };
export type { PixelSpriteProps };
