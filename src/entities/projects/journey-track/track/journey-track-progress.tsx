import type { FC } from "react";
import {cn} from "@shared/lib/utilities";


interface JourneyTrackProgressProps {
    label: string;
    value: number;
}

const JourneyTrackProgress: FC<JourneyTrackProgressProps> = ({ label, value }) => {
    return (
        <div
            role="progressbar"
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            className={cn(
                "absolute inset-x-0 bottom-[22px] h-0.5",
                "bg-[repeating-linear-gradient(90deg,#333dad_0_6px,transparent_6px_12px)]"
            )}
        >
            <div data-journey="bar-fill" className="h-full origin-left scale-x-0 bg-accent" />
        </div>
    );
};

JourneyTrackProgress.displayName = "JourneyTrackProgress";

export { JourneyTrackProgress };
export type { JourneyTrackProgressProps };
