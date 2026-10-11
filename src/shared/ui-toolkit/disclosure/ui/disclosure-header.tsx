import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface DisclosureHeaderProps {
    className?: string;
    children: ReactNode;
}

const DisclosureHeader: FC<DisclosureHeaderProps> = ({ className, children }) => (
    <div className={cn("flex items-center gap-1 pr-3", className)}>
        {children}
    </div>
);

DisclosureHeader.displayName = "DisclosureHeader";

export { DisclosureHeader };
export type { DisclosureHeaderProps };
