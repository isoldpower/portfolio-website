import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import { PROGRESS_BAR_CELLS } from "../constants.ts";

import type { IntroStageLabel } from "../types.ts";
import type { FC, HTMLAttributes } from "react";


type IntroNameLineProgressBarProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    progress: number;
    stage: IntroStageLabel;
    isVisible: boolean;
};

const IntroNameLineProgressBar: FC<IntroNameLineProgressBarProps> = ({
    progress,
    stage,
    isVisible,
    className,
    ...props
}) => {
    const filled = Math.round(progress * PROGRESS_BAR_CELLS);
    const percent = Math.round(progress * 100);

    return (
        <div
            aria-label={`Loading ${percent.toString()}%`}
            className={cn(
                "absolute top-full left-1/2 mt-[34px] flex w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap justify-center gap-x-3.5 gap-y-1 font-mono text-sm text-foreground [&>*]:whitespace-pre",
                !isVisible && "opacity-0",
                className
            )}
            {...props}
        >
            <span className="text-accent">{`[${"#".repeat(filled)}${".".repeat(PROGRESS_BAR_CELLS - filled)}]`}</span>
            <span>{`${percent.toString().padStart(3, " ")}%`}</span>
            <Text>{`> _t(intro.stages.${stage})`}</Text>
        </div>
    );
};

IntroNameLineProgressBar.displayName = "IntroNameLineProgressBar";

export { IntroNameLineProgressBar };
export type { IntroNameLineProgressBarProps };
