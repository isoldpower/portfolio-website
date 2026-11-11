import type { FC, ReactNode } from "react";


interface JourneyProjectInfoDescriptionProps {
    children: ReactNode;
}

const JourneyProjectInfoDescription: FC<JourneyProjectInfoDescriptionProps> = ({ children }) => {
    return (
        <p className="m-0 mb-4.5 text-sm leading-[1.7] opacity-85 md:text-[0.8125rem]">
            {children}
        </p>
    );
};

JourneyProjectInfoDescription.displayName = "JourneyProjectInfoDescription";

export { JourneyProjectInfoDescription };
export type { JourneyProjectInfoDescriptionProps };
