import { cn } from "@shared/lib/utilities";

import { PIXEL_GRID_CLASS } from "./constants.ts";
import { JourneyShowcaseCaption } from "./showcase/journey-showcase-caption.tsx";
import { JourneyShowcasePlaceholderNote } from "./showcase/journey-showcase-placeholder-note.tsx";
import { JourneyShowcasePlaceholderTitle } from "./showcase/journey-showcase-placeholder-title.tsx";
import { JourneyShowcasePlaceholder } from "./showcase/journey-showcase-placeholder.tsx";
import { JourneyShowcaseScreen } from "./showcase/journey-showcase-screen.tsx";
import { JourneyShowcaseScreens } from "./showcase/journey-showcase-screens.tsx";
import { JourneyShowcaseViewLabel } from "./showcase/journey-showcase-view-label.tsx";
import { JourneyShowcaseViewLabels } from "./showcase/journey-showcase-view-labels.tsx";

import type { JourneyShowcaseCaptionProps } from "./showcase/journey-showcase-caption.tsx";
import type { JourneyShowcasePlaceholderNoteProps } from "./showcase/journey-showcase-placeholder-note.tsx";
import type { JourneyShowcasePlaceholderTitleProps } from "./showcase/journey-showcase-placeholder-title.tsx";
import type { JourneyShowcasePlaceholderProps } from "./showcase/journey-showcase-placeholder.tsx";
import type { JourneyShowcaseScreenProps } from "./showcase/journey-showcase-screen.tsx";
import type { JourneyShowcaseScreensProps } from "./showcase/journey-showcase-screens.tsx";
import type { JourneyShowcaseViewLabelProps } from "./showcase/journey-showcase-view-label.tsx";
import type { JourneyShowcaseViewLabelsProps } from "./showcase/journey-showcase-view-labels.tsx";
import type { FC, ReactNode } from "react";


interface JourneyShowcaseProps {
    children: ReactNode;
}

type JourneyShowcaseObject = FC<JourneyShowcaseProps> & {
    Caption: FC<JourneyShowcaseCaptionProps>;
    Screens: FC<JourneyShowcaseScreensProps>;
    Screen: FC<JourneyShowcaseScreenProps>;
    ViewLabels: FC<JourneyShowcaseViewLabelsProps>;
    ViewLabel: FC<JourneyShowcaseViewLabelProps>;
    Placeholder: FC<JourneyShowcasePlaceholderProps>;
    PlaceholderTitle: FC<JourneyShowcasePlaceholderTitleProps>;
    PlaceholderNote: FC<JourneyShowcasePlaceholderNoteProps>;
};

const JourneyShowcase: JourneyShowcaseObject = ({ children }) => {
    return (
        <figure
            className={cn(
                "m-0 hidden border border-accent bg-background p-2 shadow-[0_12px_40px_#00000040] md:block",
                PIXEL_GRID_CLASS
            )}
        >
            {children}
        </figure>
    );
};

JourneyShowcase.Caption = JourneyShowcaseCaption;
JourneyShowcase.Screens = JourneyShowcaseScreens;
JourneyShowcase.Screen = JourneyShowcaseScreen;
JourneyShowcase.ViewLabels = JourneyShowcaseViewLabels;
JourneyShowcase.ViewLabel = JourneyShowcaseViewLabel;
JourneyShowcase.Placeholder = JourneyShowcasePlaceholder;
JourneyShowcase.PlaceholderTitle = JourneyShowcasePlaceholderTitle;
JourneyShowcase.PlaceholderNote = JourneyShowcasePlaceholderNote;
JourneyShowcase.displayName = "JourneyShowcase";

export { JourneyShowcase };
export type { JourneyShowcaseProps };
