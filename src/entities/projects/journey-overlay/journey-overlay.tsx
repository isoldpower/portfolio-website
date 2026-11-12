import { cn } from "@shared/lib/utilities";
import { JourneyOverlayNote } from "./overlay/journey-overlay-note.tsx";
import { JourneyOverlayTitle } from "./overlay/journey-overlay-title.tsx";

import type { JourneyOverlayNoteProps } from "./overlay/journey-overlay-note.tsx";
import type { JourneyOverlayTitleProps } from "./overlay/journey-overlay-title.tsx";
import type { FC, ReactNode } from "react";


type JourneyOverlayKind = "start" | "finish";

interface JourneyOverlayProps {
    kind: JourneyOverlayKind;
    isInteractive: boolean;
    children: ReactNode;
}

type JourneyOverlayObject = FC<JourneyOverlayProps> & {
    Title: FC<JourneyOverlayTitleProps>;
    Note: FC<JourneyOverlayNoteProps>;
};

const JourneyOverlay: JourneyOverlayObject = ({ kind, isInteractive, children }) => {
    return (
        <div
            data-journey={kind}
            aria-hidden={!isInteractive}
            inert={!isInteractive}
            className={cn(
                "absolute inset-x-[9.8%] top-67.5 text-center",
                kind === "finish" && "opacity-0",
                !isInteractive && "pointer-events-none"
            )}
        >
            {children}
        </div>
    );
};

JourneyOverlay.Title = JourneyOverlayTitle;
JourneyOverlay.Note = JourneyOverlayNote;
JourneyOverlay.displayName = "JourneyOverlay";

export { JourneyOverlay };
export type { JourneyOverlayKind, JourneyOverlayProps };
