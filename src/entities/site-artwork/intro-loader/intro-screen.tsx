import { cn } from "@shared/lib/utilities";

import { IntroScreenParticleCanvas } from "./screen/intro-screen-particle-canvas.tsx";

import type { IntroScreenParticleCanvasProps } from "./screen/intro-screen-particle-canvas.tsx";
import type { FC, HTMLAttributes, Ref } from "react";


type IntroScreenProps = HTMLAttributes<HTMLDivElement> & {
    ref?: Ref<HTMLDivElement>;
    isInteractive: boolean;
};

type IntroScreenObject = FC<IntroScreenProps> & {
    ParticleCanvas: FC<IntroScreenParticleCanvasProps>;
};

const IntroScreen: IntroScreenObject = ({
    isInteractive,
    className,
    children,
    ...props
}) => {
    return (
        <div
            role="status"
            aria-live="polite"
            className={cn(
                "absolute inset-0 grid place-items-center bg-background animate-intro-failsafe",
                isInteractive ? "pointer-events-auto" : "pointer-events-none",
                className
            )}
            {...props}
        >
            <div className="relative flex flex-col items-center">
                {children}
            </div>
        </div>
    );
};

IntroScreen.ParticleCanvas = IntroScreenParticleCanvas;
IntroScreen.displayName = "IntroScreen";

export { IntroScreen };
export type { IntroScreenProps };
