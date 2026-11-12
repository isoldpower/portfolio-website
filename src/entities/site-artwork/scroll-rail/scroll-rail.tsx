import { cn } from "@shared/lib/utilities";

import { ScrollRailCell } from "./rail/scroll-rail-cell.tsx";
import { ScrollRailReadout } from "./rail/scroll-rail-readout.tsx";
import { ScrollRailTrack } from "./rail/scroll-rail-track.tsx";

import type { ScrollRailCellProps } from "./rail/scroll-rail-cell.tsx";
import type { ScrollRailReadoutProps } from "./rail/scroll-rail-readout.tsx";
import type { ScrollRailTrackProps } from "./rail/scroll-rail-track.tsx";
import type { FC, HTMLAttributes } from "react";


type ScrollRailProps = HTMLAttributes<HTMLDivElement>;

type ScrollRailObject = FC<ScrollRailProps> & {
    Readout: FC<ScrollRailReadoutProps>;
    Track: FC<ScrollRailTrackProps>;
    Cell: FC<ScrollRailCellProps>;
};

const ScrollRail: ScrollRailObject = ({ className, ...props }) => {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "pointer-events-none fixed top-1/2 right-3 hidden -translate-y-1/2 flex-col items-center gap-2.5 select-none",
                "lg:flex",
                className
            )}
            {...props}
        />
    );
};

ScrollRail.Readout = ScrollRailReadout;
ScrollRail.Track = ScrollRailTrack;
ScrollRail.Cell = ScrollRailCell;
ScrollRail.displayName = "ScrollRail";

export { ScrollRail };
export type { ScrollRailProps };
