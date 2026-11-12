import type { FC, ReactNode } from "react";


interface JourneyShowcaseViewLabelsProps {
    children: ReactNode;
}

const JourneyShowcaseViewLabels: FC<JourneyShowcaseViewLabelsProps> = ({ children }) => {
    return (
        <div className="flex gap-2 px-1 pt-2.5 pb-0.5 text-2xs text-accent">
            {children}
        </div>
    );
};

JourneyShowcaseViewLabels.displayName = "JourneyShowcaseViewLabels";

export { JourneyShowcaseViewLabels };
export type { JourneyShowcaseViewLabelsProps };
