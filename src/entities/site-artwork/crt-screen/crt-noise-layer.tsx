import { cn } from "@shared/lib/utilities";

import type { HTMLAttributes } from "react";


type CrtNoiseLayerProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    tile: string | null;
};

function CrtNoiseLayer({
    tile,
    className,
    style,
    ...props
}: CrtNoiseLayerProps) {
    if (!tile) {
        return null;
    }

    return (
        <div
            className={cn("absolute inset-0 bg-size-[128px_128px] [image-rendering:pixelated]", className)}
            style={{ ...style, backgroundImage: `url(${tile})` }}
            {...props}
        />
    );
}

export { CrtNoiseLayer };
export type { CrtNoiseLayerProps };
