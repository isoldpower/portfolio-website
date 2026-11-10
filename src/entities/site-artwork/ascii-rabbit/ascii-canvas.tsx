import { cn } from "@shared/lib/utilities";

import type { CanvasHTMLAttributes, Ref } from "react";


type AsciiCanvasProps = CanvasHTMLAttributes<HTMLCanvasElement> & {
    ref?: Ref<HTMLCanvasElement>;
};

function AsciiCanvas({
    className,
    ...props
}: AsciiCanvasProps) {
    return (
        <canvas
            className={cn(
                "pointer-events-none absolute top-0 left-0 block",
                "drop-shadow-[0_0_3px_rgb(102_153_255/0.5)]",
                className
            )}
            {...props}
        />
    );
}

export { AsciiCanvas };
export type { AsciiCanvasProps };
