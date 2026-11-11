import { cn } from "@shared/lib/utilities";

import { PortfolioBodyAnchor } from "./layout/portfolio-body-anchor.tsx";
import { PortfolioBodyHeader } from "./layout/portfolio-body-header.tsx";
import { PortfolioBodyStage } from "./layout/portfolio-body-stage.tsx";

import type { PortfolioBodyAnchorProps } from "./layout/portfolio-body-anchor.tsx";
import type { PortfolioBodyHeaderProps } from "./layout/portfolio-body-header.tsx";
import type { PortfolioBodyStageProps } from "./layout/portfolio-body-stage.tsx";
import type { FC, HTMLAttributes } from "react";


type PortfolioBodyProps = HTMLAttributes<HTMLElement>;

type PortfolioBodyObject = FC<PortfolioBodyProps> & {
    Header: FC<PortfolioBodyHeaderProps>;
    Stage: FC<PortfolioBodyStageProps>;
    Anchor: FC<PortfolioBodyAnchorProps>;
};

const PortfolioBody: PortfolioBodyObject = ({ className, ...props }) => {
    return (
        <section
            className={cn("relative z-10 grid grid-cols-12 gap-x-gutter gap-y-7", className)}
            {...props}
        />
    );
};

PortfolioBody.Header = PortfolioBodyHeader;
PortfolioBody.Stage = PortfolioBodyStage;
PortfolioBody.Anchor = PortfolioBodyAnchor;
PortfolioBody.displayName = "PortfolioBody";

export { PortfolioBody };
export type { PortfolioBodyProps };
