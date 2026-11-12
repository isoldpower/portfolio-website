import { cn } from "@shared/lib/utilities";
import { PlainText } from "@shared/ui-toolkit/typography";

import type { FC, HTMLAttributes } from "react";


type HeroIndexRowProps = HTMLAttributes<HTMLDivElement> & {
    index: number;
};

const HeroIndexRow: FC<HeroIndexRowProps> = ({
    index,
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={cn(
                "grid min-h-9 grid-cols-[28px_minmax(0,1fr)] max-xs:grid-cols-[22px_minmax(0,1fr)] items-center",
                "border-t border-dashed border-extrude",
                className
            )}
            {...props}
        >
            <PlainText className="opacity-70">
                {index}
            </PlainText>
            <div className="flex min-w-0 items-center whitespace-nowrap">
                {children}
            </div>
        </div>
    );
};

HeroIndexRow.displayName = "HeroIndexRow";

export { HeroIndexRow };
export type { HeroIndexRowProps };
