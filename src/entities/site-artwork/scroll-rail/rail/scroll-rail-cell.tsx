import { cn } from "@shared/lib/utilities";

import type { FC } from "react";


interface ScrollRailCellProps {
    isLit: boolean;
    isHead: boolean;
    isMark: boolean;
}

const ScrollRailCell: FC<ScrollRailCellProps> = ({ isLit, isHead, isMark }) => {
    return (
        <span
            className={cn(
                "block h-1.5 w-2",
                isLit ? "bg-accent" : "bg-deep/60",
                isMark && !isLit && "bg-extrude",
                isHead && "bg-highlight shadow-[0_0_8px_#6699ff]"
            )}
        />
    );
};

ScrollRailCell.displayName = "ScrollRailCell";

export { ScrollRailCell };
export type { ScrollRailCellProps };
