import type { FC, ReactNode } from "react";


interface JourneyShowcasePlaceholderNoteProps {
    children: ReactNode;
}

const JourneyShowcasePlaceholderNote: FC<JourneyShowcasePlaceholderNoteProps> = ({ children }) => {
    return (
        <span className="text-2xs opacity-60">
            {children}
        </span>
    );
};

JourneyShowcasePlaceholderNote.displayName = "JourneyShowcasePlaceholderNote";

export { JourneyShowcasePlaceholderNote };
export type { JourneyShowcasePlaceholderNoteProps };
