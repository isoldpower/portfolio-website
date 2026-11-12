import { cn } from "@shared/lib/utilities";
import { PlainText } from "@shared/ui-toolkit/typography";

import type { AnchorHTMLAttributes, FC } from "react";


type ProjectLiveBarActionProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

const ProjectLiveBarAction: FC<ProjectLiveBarActionProps> = ({ className, children, ...props }) => {
    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "inline-flex items-center gap-1.5 border border-accent bg-background px-3 py-1.5",
                "font-mono text-xs text-accent no-underline",
                className
            )}
            {...props}
        >
            <PlainText>{children}</PlainText>
            <PlainText aria-hidden="true">↗</PlainText>
        </a>
    );
};

ProjectLiveBarAction.displayName = "ProjectLiveBarAction";

export { ProjectLiveBarAction };
export type { ProjectLiveBarActionProps };
