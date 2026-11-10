import { cn } from "@shared/lib/utilities";

import type { ReactNode } from "react";


interface HeroModeOptionProps {
    isActive: boolean;
    children: ReactNode;
}

function HeroModeOption({
    isActive,
    children
}: HeroModeOptionProps) {
    return (
        <span className={cn(isActive && "font-semibold text-highlight")}>
            {children}
        </span>
    );
}

export { HeroModeOption };
export type { HeroModeOptionProps };
