import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { zeroPad } from "@shared/lib/utilities";

import { PAGE_LABEL_DIGITS } from "../constants.ts";
import { useProjectBrowser } from "../context/use-project-browser.ts";


interface BrowserPageView {
    pageIndex: number;
    labelText: string;
    ariaLabel: string;
    isCurrent: boolean;
}

interface UseBrowserPaginationReturn {
    isVisible: boolean;
    pageViews: readonly BrowserPageView[];
    hasPrevious: boolean;
    hasNext: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onSelectPage: (pageIndex: number) => void;
}

const useBrowserPagination = (): UseBrowserPaginationReturn => {
    const { t } = useTranslation();
    const { pageIndex, pageCount, changePage } = useProjectBrowser();

    const onPrevious = useCallback(() => {
        changePage(Math.max(0, pageIndex - 1));
    }, [changePage, pageIndex]);

    const onNext = useCallback(() => {
        changePage(Math.min(pageCount - 1, pageIndex + 1));
    }, [changePage, pageIndex, pageCount]);

    return useMemo(() => {
        const pageViews = Array.from({ length: pageCount }, (_, listedPageIndex): BrowserPageView => {
            return {
                pageIndex: listedPageIndex,
                labelText: zeroPad(listedPageIndex + 1, PAGE_LABEL_DIGITS),
                ariaLabel: t("browser.page", { page: listedPageIndex + 1 }),
                isCurrent: listedPageIndex === pageIndex,
            };
        });

        return {
            isVisible: pageCount > 1,
            pageViews,
            hasPrevious: pageIndex > 0,
            hasNext: pageIndex < pageCount - 1,
            onPrevious,
            onNext,
            onSelectPage: changePage,
        };
    }, [pageCount, pageIndex, onPrevious, onNext, changePage, t]);
};

export { useBrowserPagination };
export type { BrowserPageView, UseBrowserPaginationReturn };
