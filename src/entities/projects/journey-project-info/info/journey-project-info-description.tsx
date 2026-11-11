import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyProjectInfoDescriptionProps {
    children: ReactNode;
}

const JourneyProjectInfoDescription: FC<JourneyProjectInfoDescriptionProps> = ({ children }) => {
    return (
        <Text as="p" size="sm" className="m-0 mb-4.5 leading-[1.7] opacity-85 md:text-[0.8125rem]">
            {children}
        </Text>
    );
};

JourneyProjectInfoDescription.displayName = "JourneyProjectInfoDescription";

export { JourneyProjectInfoDescription };
export type { JourneyProjectInfoDescriptionProps };
