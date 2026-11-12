import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface HeroIndexModeOptionProps {
    isActive: boolean;
    children: ReactNode;
}

const HeroIndexModeOption: FC<HeroIndexModeOptionProps> = ({ isActive, children }) => {
    return (
        <Text weight={isActive ? "semibold" : undefined} tone={isActive ? "highlight" : "default"}>
            {children}
        </Text>
    );
};

HeroIndexModeOption.displayName = "HeroIndexModeOption";

export { HeroIndexModeOption };
export type { HeroIndexModeOptionProps };
