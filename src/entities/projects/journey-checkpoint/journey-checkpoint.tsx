import { useMemo } from "react";
import { cn } from "@shared/lib/utilities";
import { JourneyCheckpointFlag } from "./checkpoint/journey-checkpoint-flag.tsx";
import { JourneyCheckpointLabel } from "./checkpoint/journey-checkpoint-label.tsx";
import { JourneyCheckpointWavingFlag } from "./checkpoint/journey-checkpoint-waving-flag.tsx";
import { CHECKPOINT_HALF_WIDTH, PERCENT } from "./constants.ts";

import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import type { JourneyCheckpointFlagProps } from "./checkpoint/journey-checkpoint-flag.tsx";
import type { JourneyCheckpointLabelProps } from "./checkpoint/journey-checkpoint-label.tsx";
import type { JourneyCheckpointWavingFlagProps } from "./checkpoint/journey-checkpoint-waving-flag.tsx";
import type { JourneyCheckpointState } from "./types.ts";


type JourneyCheckpointProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    position: number;
    state: JourneyCheckpointState;
    children: ReactNode;
};

type JourneyCheckpointObject = FC<JourneyCheckpointProps> & {
    Flag: FC<JourneyCheckpointFlagProps>;
    WavingFlag: FC<JourneyCheckpointWavingFlagProps>;
    Label: FC<JourneyCheckpointLabelProps>;
};

const JourneyCheckpoint: JourneyCheckpointObject = ({
    position,
    state,
    className,
    children,
    ...props
}) => {
    const leftShift = useMemo(() => {
        return `calc(${String(position * PERCENT)}% - ${String(CHECKPOINT_HALF_WIDTH)}px)`;
    }, []);

    return (
        <button
            type="button"
            aria-current={state === "current" ? "step" : undefined}
            className={cn(
                "absolute bottom-0 h-13 w-30 cursor-pointer border-none bg-transparent p-0",
                state === "current" ? "text-highlight" : "text-accent",
                className
            )}
            style={{ left: leftShift }}
            {...props}
        >
            {children}
        </button>
    );
};

JourneyCheckpoint.Flag = JourneyCheckpointFlag;
JourneyCheckpoint.WavingFlag = JourneyCheckpointWavingFlag;
JourneyCheckpoint.Label = JourneyCheckpointLabel;
JourneyCheckpoint.displayName = "JourneyCheckpoint";

export { JourneyCheckpoint };
export type { JourneyCheckpointProps };
