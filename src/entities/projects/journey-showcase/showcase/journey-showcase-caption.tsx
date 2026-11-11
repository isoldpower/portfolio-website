import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyShowcaseCaptionProps {
    children: ReactNode;
}

const JourneyShowcaseCaption: FC<JourneyShowcaseCaptionProps> = ({ children }) => {
    return (
        <Text as="figcaption" size="2xs" className="px-1 pt-1 pb-2.5 opacity-70 max-lg:hidden">
            {children}
        </Text>
    );
};

JourneyShowcaseCaption.displayName = "JourneyShowcaseCaption";

export { JourneyShowcaseCaption };
export type { JourneyShowcaseCaptionProps };
