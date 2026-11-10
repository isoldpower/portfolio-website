import { cn } from "@shared/lib/utilities";

import type { CanvasHTMLAttributes, FC, Ref } from "react";


type IntroScreenParticleCanvasProps = CanvasHTMLAttributes<HTMLCanvasElement> & {
    ref?: Ref<HTMLCanvasElement>;
};

const IntroScreenParticleCanvas: FC<IntroScreenParticleCanvasProps> = ({ className, ...props }) => {
    return (
        <canvas
            aria-hidden="true"
            className={cn("pointer-events-none fixed inset-0 size-full", className)}
            {...props}
        />
    );
};

IntroScreenParticleCanvas.displayName = "IntroScreenParticleCanvas";

export { IntroScreenParticleCanvas };
export type { IntroScreenParticleCanvasProps };
