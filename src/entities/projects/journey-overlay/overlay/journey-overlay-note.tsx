import type { FC, ReactNode } from "react";


interface JourneyOverlayNoteProps {
    children: ReactNode;
}

const JourneyOverlayNote: FC<JourneyOverlayNoteProps> = ({ children }) => {
    return (
        <p className="m-0 mt-5.5 text-2xs tracking-[2px] opacity-55">
            {children}
        </p>
    );
};

JourneyOverlayNote.displayName = "JourneyOverlayNote";

export { JourneyOverlayNote };
export type { JourneyOverlayNoteProps };
