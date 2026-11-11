import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyShowcasePlaceholderTitleProps {
    children: ReactNode;
}

const JourneyShowcasePlaceholderTitle: FC<JourneyShowcasePlaceholderTitleProps> = ({ children }) => {
    return (
        <Text size="2xl">
            {children}
        </Text>
    );
};

JourneyShowcasePlaceholderTitle.displayName = "JourneyShowcasePlaceholderTitle";

export { JourneyShowcasePlaceholderTitle };
export type { JourneyShowcasePlaceholderTitleProps };
