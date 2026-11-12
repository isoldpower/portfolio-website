import { cn } from "@shared/lib/utilities";
import { PERCENT } from "../constants.ts";

import type { FC, HTMLAttributes } from "react";


type ProjectFrameLoaderProps = HTMLAttributes<HTMLDivElement> & {
    progress: number;
    isHidden: boolean;
};

const ProjectFrameLoader: FC<ProjectFrameLoaderProps> = ({ progress, isHidden, className, ...props }) => {
    return (
        <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={PERCENT}
            aria-valuenow={Math.round(progress * PERCENT)}
            className={cn(
                "absolute inset-px flex flex-col items-center justify-center gap-2 bg-background px-4",
                "font-mono text-sm text-foreground *:whitespace-pre",
                isHidden && "pointer-events-none opacity-0",
                className
            )}
            {...props}
        />
    );
};

ProjectFrameLoader.displayName = "ProjectFrameLoader";

export { ProjectFrameLoader };
export type { ProjectFrameLoaderProps };
