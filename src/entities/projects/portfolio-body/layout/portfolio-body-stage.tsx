import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type PortfolioBodyStageProps = HTMLAttributes<HTMLDivElement>;

const PortfolioBodyStage: FC<PortfolioBodyStageProps> = ({ className, ...props }) => {
    return (
        <div className={cn("col-span-12 mx-[calc(50%-50vw)]", className)} {...props} />
    );
};

PortfolioBodyStage.displayName = "PortfolioBodyStage";

export { PortfolioBodyStage };
export type { PortfolioBodyStageProps };
