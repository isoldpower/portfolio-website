import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyProjectInfoTechProps {
    children: ReactNode;
}

const JourneyProjectInfoTech: FC<JourneyProjectInfoTechProps> = ({ children }) => {
    return (
        <Text as="li" size="2xs" className="border border-accent/35 bg-background px-2 py-1.25">
            {children}
        </Text>
    );
};

JourneyProjectInfoTech.displayName = "JourneyProjectInfoTech";

export { JourneyProjectInfoTech };
export type { JourneyProjectInfoTechProps };
