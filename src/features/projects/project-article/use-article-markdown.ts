import { useMemo } from "react";

import { useLocalize } from "@features/localization/localized-value";

import type { EmbeddedProject } from "@entities/projects/model";


type UseArticleMarkdownReturn = string;

const useArticleMarkdown = (project: EmbeddedProject): UseArticleMarkdownReturn => {
    const localize = useLocalize();
    const article = localize(project.article).trim();

    return useMemo(() => {
        if (article) {
            return article;
        }

        return [
            ...(project.video ? ["![](video:showcase)"] : []),
            ...project.photoAssets.map((_, index) => {
                return `![](photo:${String(index + 1)})`;
            }),
        ].join("\n\n");
    }, [article, project.video, project.photoAssets]);
};

export { useArticleMarkdown };
export type { UseArticleMarkdownReturn };
