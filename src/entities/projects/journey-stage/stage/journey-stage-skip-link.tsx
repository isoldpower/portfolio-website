import { cn } from "@shared/lib/utilities";

import type { AnchorHTMLAttributes, FC } from "react";


type JourneyStageSkipLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const JourneyStageSkipLink: FC<JourneyStageSkipLinkProps> = ({ className, ...props }) => {
    return (
        <a
            className={cn(
                "py-1.5 font-semibold text-highlight text-shadow-soft",
                className
            )}
            {...props}
        />
    );
};

JourneyStageSkipLink.displayName = "JourneyStageSkipLink";

export { JourneyStageSkipLink };
export type { JourneyStageSkipLinkProps };
