import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyProjectInfoDistrictProps {
    children: ReactNode;
}

const JourneyProjectInfoDistrict: FC<JourneyProjectInfoDistrictProps> = ({ children }) => {
    return (
        <Text as="p" size="2xs" className="m-0 tracking-[2px] text-foreground/90">
            {children}
        </Text>
    );
};

JourneyProjectInfoDistrict.displayName = "JourneyProjectInfoDistrict";

export { JourneyProjectInfoDistrict };
export type { JourneyProjectInfoDistrictProps };
