import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type PortfolioBodyAnchorProps = HTMLAttributes<HTMLDivElement>;

const PortfolioBodyAnchor: FC<PortfolioBodyAnchorProps> = ({ className, ...props }) => {
    return (
        <div aria-hidden="true" className={cn("col-span-12 h-0", className)} {...props} />
    );
};

PortfolioBodyAnchor.displayName = "PortfolioBodyAnchor";

export { PortfolioBodyAnchor };
export type { PortfolioBodyAnchorProps };
