import { cn } from "@shared/lib/utilities";

import { AboutBodyHeader } from "./layout/about-body-header.tsx";
import { AboutBodyPortrait } from "./layout/about-body-portrait.tsx";
import { AboutBodyDescription } from "./panel/about-body-description.tsx";
import { AboutBodyLineCursor } from "./variables/about-body-line-cursor.tsx";
import { AboutBodyLineSlot } from "./variables/about-body-line-slot.tsx";
import { AboutBodyNote } from "./variables/about-body-note.tsx";
import { AboutBodyVariable } from "./variables/about-body-variable.tsx";
import { AboutBodyVariableLine } from "./variables/about-body-variable-line.tsx";
import { AboutBodyVariables } from "./variables/about-body-variables.tsx";

import type { AboutBodyHeaderProps } from "./layout/about-body-header.tsx";
import type { AboutBodyPortraitProps } from "./layout/about-body-portrait.tsx";
import type { AboutBodyDescriptionProps } from "./panel/about-body-description.tsx";
import type { AboutBodyLineCursorProps } from "./variables/about-body-line-cursor.tsx";
import type { AboutBodyLineSlotProps } from "./variables/about-body-line-slot.tsx";
import type { AboutBodyNoteProps } from "./variables/about-body-note.tsx";
import type { AboutBodyVariableProps } from "./variables/about-body-variable.tsx";
import type { AboutBodyVariableLineProps } from "./variables/about-body-variable-line.tsx";
import type { AboutBodyVariablesProps } from "./variables/about-body-variables.tsx";
import type { FC, HTMLAttributes } from "react";


type AboutBodyProps = HTMLAttributes<HTMLElement>;

type AboutBodyObject = FC<AboutBodyProps> & {
    Header: FC<AboutBodyHeaderProps>;
    Portrait: FC<AboutBodyPortraitProps>;
    Description: FC<AboutBodyDescriptionProps>;
    Variables: FC<AboutBodyVariablesProps>;
    VariableLine: FC<AboutBodyVariableLineProps>;
    Variable: FC<AboutBodyVariableProps>;
    Note: FC<AboutBodyNoteProps>;
    LineSlot: FC<AboutBodyLineSlotProps>;
    LineCursor: FC<AboutBodyLineCursorProps>;
};

const AboutBody: AboutBodyObject = ({ className, ...props }) => {
    return (
        <section
            className={cn("grid grid-cols-12 gap-x-gutter gap-y-7", className)}
            {...props}
        />
    );
};

AboutBody.Header = AboutBodyHeader;
AboutBody.Portrait = AboutBodyPortrait;
AboutBody.Description = AboutBodyDescription;
AboutBody.Variables = AboutBodyVariables;
AboutBody.VariableLine = AboutBodyVariableLine;
AboutBody.Variable = AboutBodyVariable;
AboutBody.Note = AboutBodyNote;
AboutBody.LineSlot = AboutBodyLineSlot;
AboutBody.LineCursor = AboutBodyLineCursor;
AboutBody.displayName = "AboutBody";

export { AboutBody };
export type { AboutBodyProps };
