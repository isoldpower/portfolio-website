import type { FC, ReactNode } from "react";
import {cn} from "@shared/lib/utilities";


interface ProjectArticleQuoteProps {
    children: ReactNode;
}

const ProjectArticleQuote: FC<ProjectArticleQuoteProps> = ({ children }) => {
    return (
        <blockquote
            className={cn(
                "m-0 flex flex-col gap-3 border-l-2 border-accent",
                "bg-accent/5 py-2 pr-4 pl-5 text-highlight"
            )}
        >
            {children}
        </blockquote>
    );
};

ProjectArticleQuote.displayName = "ProjectArticleQuote";

export { ProjectArticleQuote };
export type { ProjectArticleQuoteProps };
