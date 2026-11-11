import type { FC, ReactNode } from "react";


interface JourneyShowcaseCaptionProps {
    children: ReactNode;
}

const JourneyShowcaseCaption: FC<JourneyShowcaseCaptionProps> = ({ children }) => {
    return (
        <figcaption className="px-1 pt-1 pb-2.5 text-2xs opacity-70">
            {children}
        </figcaption>
    );
};

JourneyShowcaseCaption.displayName = "JourneyShowcaseCaption";

export { JourneyShowcaseCaption };
export type { JourneyShowcaseCaptionProps };
