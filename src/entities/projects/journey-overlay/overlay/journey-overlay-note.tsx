import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyOverlayNoteProps {
    children: ReactNode;
}

const JourneyOverlayNote: FC<JourneyOverlayNoteProps> = ({ children }) => {
    return (
        <Text as="p" size="2xs" className="m-0 mt-5.5 tracking-[2px] opacity-55">
            {children}
        </Text>
    );
};

JourneyOverlayNote.displayName = "JourneyOverlayNote";

export { JourneyOverlayNote };
export type { JourneyOverlayNoteProps };
