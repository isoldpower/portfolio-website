import { useTranslation } from "react-i18next";

import { ProjectBrowser } from "@entities/projects/project-browser";
import { JourneyButtonHover } from "@features/projects/journey-animations";
import { useBrowserPagination } from "@features/projects/project-browser";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { AnimationComposer } from "@shared/lib/components";


function ProjectBrowserPagination() {
    const { t } = useTranslation();
    const browserPagination = useBrowserPagination();

    if (!browserPagination.isVisible) {
        return null;
    }

    return (
        <ProjectBrowser.Pagination label={t("browser.pagination_label")}>
            <AnimationComposer>
                <FocusOutline />
                <JourneyButtonHover />
                <ProjectBrowser.PageButton
                    disabled={!browserPagination.hasPrevious}
                    onClick={browserPagination.onPrevious}
                >
                    _t(browser.previous)
                </ProjectBrowser.PageButton>
            </AnimationComposer>
            {browserPagination.pageViews.map((pageView) => (
                <AnimationComposer key={pageView.pageIndex}>
                    <FocusOutline />
                    <JourneyButtonHover />
                    <ProjectBrowser.PageButton
                        isCurrent={pageView.isCurrent}
                        aria-label={pageView.ariaLabel}
                        onClick={() => { browserPagination.onSelectPage(pageView.pageIndex); }}
                    >
                        {pageView.labelText}
                    </ProjectBrowser.PageButton>
                </AnimationComposer>
            ))}
            <AnimationComposer>
                <FocusOutline />
                <JourneyButtonHover />
                <ProjectBrowser.PageButton
                    disabled={!browserPagination.hasNext}
                    onClick={browserPagination.onNext}
                >
                    _t(browser.next)
                </ProjectBrowser.PageButton>
            </AnimationComposer>
        </ProjectBrowser.Pagination>
    );
}

export { ProjectBrowserPagination };
