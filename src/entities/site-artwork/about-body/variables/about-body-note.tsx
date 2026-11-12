import { PlainText, Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface AboutBodyNoteProps {
    note: string;
    children?: ReactNode;
}

const AboutBodyNote: FC<AboutBodyNoteProps> = ({ note, children }) => {
    return (
        <PlainText className="col-[2/-1] pl-[4ch] -indent-[4ch] md:pl-0 md:indent-0">
            <Text tone="accent">_t(about.note_label)</Text> {note}{children}
        </PlainText>
    );
};

AboutBodyNote.displayName = "AboutBodyNote";

export { AboutBodyNote };
export type { AboutBodyNoteProps };
