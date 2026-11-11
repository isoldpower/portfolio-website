import type { FC, ReactNode } from "react";


interface JourneyShowcasePlaceholderTitleProps {
    children: ReactNode;
}

const JourneyShowcasePlaceholderTitle: FC<JourneyShowcasePlaceholderTitleProps> = ({ children }) => {
    return (
        <span className="text-2xl">
            {children}
        </span>
    );
};

JourneyShowcasePlaceholderTitle.displayName = "JourneyShowcasePlaceholderTitle";

export { JourneyShowcasePlaceholderTitle };
export type { JourneyShowcasePlaceholderTitleProps };
