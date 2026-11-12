import type { FC } from "react";


type ProjectArticleRuleProps = Record<string, never>;

const ProjectArticleRule: FC<ProjectArticleRuleProps> = () => {
    return (
        <hr className="my-2 h-0 border-0 border-t border-dashed border-accent/60" />
    );
};

ProjectArticleRule.displayName = "ProjectArticleRule";

export { ProjectArticleRule };
export type { ProjectArticleRuleProps };
