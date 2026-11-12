import { cn } from "@shared/lib/utilities";
import { PlainText } from "@shared/ui-toolkit/typography";

import type { AnchorHTMLAttributes, FC } from "react";


type JourneyStageSkipLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const JourneyStageSkipLink: FC<JourneyStageSkipLinkProps> = ({ className, children, ...props }) => {
    return (
        <a
            className={cn(
                "py-1.5 font-semibold text-highlight text-shadow-soft",
                className
            )}
            {...props}
        >
            <PlainText>{children}</PlainText>
        </a>
    );
};

JourneyStageSkipLink.displayName = "JourneyStageSkipLink";

export { JourneyStageSkipLink };
export type { JourneyStageSkipLinkProps };
