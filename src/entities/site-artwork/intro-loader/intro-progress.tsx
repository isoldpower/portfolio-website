import { cn } from "@shared/lib/utilities";

import { PERCENT } from "./constants.ts";
import { IntroProgressBar } from "./progress/intro-progress-bar.tsx";
import { IntroProgressPercent } from "./progress/intro-progress-percent.tsx";
import { IntroProgressStage } from "./progress/intro-progress-stage.tsx";

import type { IntroProgressBarProps } from "./progress/intro-progress-bar.tsx";
import type { IntroProgressPercentProps } from "./progress/intro-progress-percent.tsx";
import type { IntroProgressStageProps } from "./progress/intro-progress-stage.tsx";
import type { FC, HTMLAttributes } from "react";


type IntroProgressProps = HTMLAttributes<HTMLDivElement> & {
    progress: number;
    isVisible: boolean;
};

type IntroProgressObject = FC<IntroProgressProps> & {
    Bar: FC<IntroProgressBarProps>;
    Percent: FC<IntroProgressPercentProps>;
    Stage: FC<IntroProgressStageProps>;
};

const IntroProgress: IntroProgressObject = ({
    progress,
    isVisible,
    className,
    children,
    ...props
}) => {
    return (
        <div
            aria-label={`Loading ${Math.round(progress * PERCENT).toString()}%`}
            className={cn(
                "absolute top-full left-1/2 mt-8.5 flex w-max max-w-[calc(100vw-2rem)] -translate-x-1/2",
                "flex-wrap justify-center gap-x-3.5 gap-y-1 font-mono text-sm text-foreground *:whitespace-pre",
                !isVisible && "opacity-0",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

IntroProgress.Bar = IntroProgressBar;
IntroProgress.Percent = IntroProgressPercent;
IntroProgress.Stage = IntroProgressStage;
IntroProgress.displayName = "IntroProgress";

export { IntroProgress };
export type { IntroProgressProps };
