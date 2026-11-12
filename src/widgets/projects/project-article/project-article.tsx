import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ProjectArticle as ProjectArticleBody } from "@entities/projects/project-article";
import { useArticleComponents, useArticleMarkdown, useArticleUrlTransform } from "@features/projects/project-article";

import type { EmbeddedProject } from "@entities/projects/model";


interface ProjectArticleProps {
    project: EmbeddedProject;
}

const REMARK_PLUGINS = [remarkGfm];

function ProjectArticle({ project }: ProjectArticleProps) {
    const markdown = useArticleMarkdown(project);
    const components = useArticleComponents(project);
    const urlTransform = useArticleUrlTransform();

    return (
        <ProjectArticleBody>
            {markdown && (
                <Markdown remarkPlugins={REMARK_PLUGINS} components={components} urlTransform={urlTransform}>
                    {markdown}
                </Markdown>
            )}
            {!markdown && (
                <ProjectArticleBody.Empty>
                    _t(project.article_empty)
                </ProjectArticleBody.Empty>
            )}
        </ProjectArticleBody>
    );
}

export { ProjectArticle };
export type { ProjectArticleProps };
