import { cn } from "@shared/lib/utilities";

import type { AnchorHTMLAttributes, FC } from "react";


type ProjectArticleLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const ProjectArticleLink: FC<ProjectArticleLinkProps> = ({ className, ...props }) => {
    return (
        <a
            className={cn(
                "font-semibold text-highlight underline-offset-4",
                className
            )}
            {...props}
        />
    );
};

ProjectArticleLink.displayName = "ProjectArticleLink";

export { ProjectArticleLink };
export type { ProjectArticleLinkProps };
