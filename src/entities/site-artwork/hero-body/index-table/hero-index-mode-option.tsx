import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface HeroIndexModeOptionProps {
    isActive: boolean;
    children: ReactNode;
}

const HeroIndexModeOption: FC<HeroIndexModeOptionProps> = ({ isActive, children }) => {
    return (
        <span className={cn(isActive && "font-semibold text-highlight")}>
            {children}
        </span>
    );
};

HeroIndexModeOption.displayName = "HeroIndexModeOption";

export { HeroIndexModeOption };
export type { HeroIndexModeOptionProps };
