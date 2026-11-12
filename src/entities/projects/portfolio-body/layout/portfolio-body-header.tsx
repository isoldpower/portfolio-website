import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type PortfolioBodyHeaderProps = HTMLAttributes<HTMLDivElement>;

const PortfolioBodyHeader: FC<PortfolioBodyHeaderProps> = ({ className, ...props }) => {
    return (
        <div className={cn("col-span-12", className)} {...props} />
    );
};

PortfolioBodyHeader.displayName = "PortfolioBodyHeader";

export { PortfolioBodyHeader };
export type { PortfolioBodyHeaderProps };
