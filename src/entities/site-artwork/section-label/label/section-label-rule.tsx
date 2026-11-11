import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type SectionLabelRuleProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    isDrawn: boolean;
};

const SectionLabelRule: FC<SectionLabelRuleProps> = ({ isDrawn, className, ...props }) => {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "absolute inset-x-0 top-9 h-0 border-t border-dashed border-foreground/80",
                isDrawn ? "[clip-path:inset(0)]" : "[clip-path:inset(0_100%_0_0)]",
                className
            )}
            {...props}
        />
    );
};

SectionLabelRule.displayName = "SectionLabelRule";

export { SectionLabelRule };
export type { SectionLabelRuleProps };
