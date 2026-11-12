import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyShowcasePlaceholderNoteProps {
    children: ReactNode;
}

const JourneyShowcasePlaceholderNote: FC<JourneyShowcasePlaceholderNoteProps> = ({ children }) => {
    return (
        <Text size="2xs" className="opacity-60">
            {children}
        </Text>
    );
};

JourneyShowcasePlaceholderNote.displayName = "JourneyShowcasePlaceholderNote";

export { JourneyShowcasePlaceholderNote };
export type { JourneyShowcasePlaceholderNoteProps };
