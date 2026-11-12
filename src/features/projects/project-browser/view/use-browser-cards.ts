import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { resolveKindLabel } from "@entities/projects/visual-map";
import { useLocalize } from "@features/localization/localized-value";
import { PROJECTS_PER_PAGE } from "../constants.ts";
import { useProjectBrowser } from "../context/use-project-browser.ts";

import type { ProjectCard } from "@entities/projects/model";


interface BrowserCardView {
    project: ProjectCard;
    kindLabel: string;
    descriptionText: string;
    techText: string;
    imageAlt: string;
    placeholderTitle: string;
}

interface UseBrowserCardsReturn {
    cardViews: readonly BrowserCardView[];
    fillerCount: number;
    statusText: string;
    isEmpty: boolean;
}

const useBrowserCards = (): UseBrowserCardsReturn => {
    const { t } = useTranslation();
    const localize = useLocalize();
    const { pageProjects, matchingProjects, pageIndex, pageCount } = useProjectBrowser();

    return useMemo(() => {
        const cardViews = pageProjects.map((project): BrowserCardView => {
            const kindLabel = resolveKindLabel(project.kind);

            return {
                project,
                kindLabel,
                descriptionText: localize(project.description),
                techText: project.tech.join(", "),
                imageAlt: (project.image && localize(project.image.alt)) || project.title,
                placeholderTitle: `[ ${kindLabel.toUpperCase()} ]`,
            };
        });
        const firstShownPosition = pageIndex * PROJECTS_PER_PAGE + 1;

        return {
            cardViews,
            fillerCount: pageCount > 1 ? PROJECTS_PER_PAGE - pageProjects.length : 0,
            statusText: matchingProjects.length === 0
                ? t("browser.status_empty")
                : t("browser.status", {
                    from: firstShownPosition,
                    to: firstShownPosition + pageProjects.length - 1,
                    total: matchingProjects.length,
                }),
            isEmpty: matchingProjects.length === 0,
        };
    }, [pageProjects, matchingProjects.length, pageIndex, pageCount, localize, t]);
};

export { useBrowserCards };
export type { BrowserCardView, UseBrowserCardsReturn };
