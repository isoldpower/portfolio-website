import { cn } from "@shared/lib/utilities";

import type { CanvasHTMLAttributes, Ref } from "react";


type CrtVignetteLayerProps = CanvasHTMLAttributes<HTMLCanvasElement> & {
    ref?: Ref<HTMLCanvasElement>;
};

function CrtVignetteLayer({
    className,
    ...props
}: CrtVignetteLayerProps) {
    return (
        <canvas
            className={cn("absolute inset-0 size-full [image-rendering:pixelated]", className)}
            {...props}
        />
    );
}

export { CrtVignetteLayer };
export type { CrtVignetteLayerProps };
