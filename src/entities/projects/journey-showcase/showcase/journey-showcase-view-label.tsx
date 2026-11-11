import type { FC, ReactNode } from "react";


interface JourneyShowcaseViewLabelProps {
    marker: string;
    isDimmed: boolean;
    children: ReactNode;
}

const JourneyShowcaseViewLabel: FC<JourneyShowcaseViewLabelProps> = ({
    marker,
    isDimmed,
    children
}) => {
    return (
        <span data-journey-view={marker} className={isDimmed ? "opacity-35" : undefined}>
            {children}
        </span>
    );
};

JourneyShowcaseViewLabel.displayName = "JourneyShowcaseViewLabel";

export { JourneyShowcaseViewLabel };
export type { JourneyShowcaseViewLabelProps };
