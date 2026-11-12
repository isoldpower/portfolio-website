import { ProjectArticleHeading } from "./text/project-article-heading.tsx";
import { ProjectArticleParagraph } from "./text/project-article-paragraph.tsx";
import { ProjectArticleList } from "./text/project-article-list.tsx";
import { ProjectArticleListItem } from "./text/project-article-list-item.tsx";
import { ProjectArticleLink } from "./text/project-article-link.tsx";
import { ProjectArticleInlineCode } from "./code/project-article-inline-code.tsx";
import { ProjectArticleCodeBlock } from "./code/project-article-code-block.tsx";
import { ProjectArticleQuote } from "./text/project-article-quote.tsx";
import { ProjectArticleRule } from "./text/project-article-rule.tsx";
import { ProjectArticleTable } from "./table/project-article-table.tsx";
import { ProjectArticleFigure } from "./media/project-article-figure.tsx";
import { ProjectArticleImage } from "./media/project-article-image.tsx";
import { ProjectArticleVideo } from "./media/project-article-video.tsx";
import { ProjectArticleEmpty } from "./text/project-article-empty.tsx";

import type { ProjectArticleHeadingProps } from "./text/project-article-heading.tsx";
import type { ProjectArticleParagraphProps } from "./text/project-article-paragraph.tsx";
import type { ProjectArticleListProps } from "./text/project-article-list.tsx";
import type { ProjectArticleListItemProps } from "./text/project-article-list-item.tsx";
import type { ProjectArticleLinkProps } from "./text/project-article-link.tsx";
import type { ProjectArticleInlineCodeProps } from "./code/project-article-inline-code.tsx";
import type { ProjectArticleCodeBlockProps } from "./code/project-article-code-block.tsx";
import type { ProjectArticleQuoteProps } from "./text/project-article-quote.tsx";
import type { ProjectArticleRuleProps } from "./text/project-article-rule.tsx";
import type { ProjectArticleTableProps } from "./table/project-article-table.tsx";
import type { ProjectArticleFigureProps } from "./media/project-article-figure.tsx";
import type { ProjectArticleImageProps } from "./media/project-article-image.tsx";
import type { ProjectArticleVideoProps } from "./media/project-article-video.tsx";
import type { ProjectArticleEmptyProps } from "./text/project-article-empty.tsx";
import type { FC, ReactNode } from "react";


interface ProjectArticleProps {
    children: ReactNode;
}

type ProjectArticleObject = FC<ProjectArticleProps> & {
    Heading: FC<ProjectArticleHeadingProps>;
    Paragraph: FC<ProjectArticleParagraphProps>;
    List: FC<ProjectArticleListProps>;
    ListItem: FC<ProjectArticleListItemProps>;
    Link: FC<ProjectArticleLinkProps>;
    InlineCode: FC<ProjectArticleInlineCodeProps>;
    CodeBlock: FC<ProjectArticleCodeBlockProps>;
    Quote: FC<ProjectArticleQuoteProps>;
    Rule: FC<ProjectArticleRuleProps>;
    Table: FC<ProjectArticleTableProps>;
    Figure: FC<ProjectArticleFigureProps>;
    Image: FC<ProjectArticleImageProps>;
    Video: FC<ProjectArticleVideoProps>;
    Empty: FC<ProjectArticleEmptyProps>;
};

const ProjectArticle: ProjectArticleObject = ({ children }) => {
    return (
        <article className="flex w-full min-w-0 flex-col gap-5 font-mono text-md leading-[1.75] text-foreground">
            {children}
        </article>
    );
};

ProjectArticle.Heading = ProjectArticleHeading;
ProjectArticle.Paragraph = ProjectArticleParagraph;
ProjectArticle.List = ProjectArticleList;
ProjectArticle.ListItem = ProjectArticleListItem;
ProjectArticle.Link = ProjectArticleLink;
ProjectArticle.InlineCode = ProjectArticleInlineCode;
ProjectArticle.CodeBlock = ProjectArticleCodeBlock;
ProjectArticle.Quote = ProjectArticleQuote;
ProjectArticle.Rule = ProjectArticleRule;
ProjectArticle.Table = ProjectArticleTable;
ProjectArticle.Figure = ProjectArticleFigure;
ProjectArticle.Image = ProjectArticleImage;
ProjectArticle.Video = ProjectArticleVideo;
ProjectArticle.Empty = ProjectArticleEmpty;

ProjectArticle.displayName = "ProjectArticle";

export { ProjectArticle };
export type { ProjectArticleProps };
