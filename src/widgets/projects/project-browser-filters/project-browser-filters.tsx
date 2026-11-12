import { useId } from "react";

import { ProjectBrowser } from "@entities/projects/project-browser";
import { useBrowserFilters } from "@features/projects/project-browser";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { LinkHover } from "@features/site-artwork/link-hover";
import { AnimationComposer } from "@shared/lib/components";

import { ProjectBrowserSelectField } from "./filters/project-browser-select-field.tsx";


function ProjectBrowserFilters() {
    const browserFilters = useBrowserFilters();
    const fieldIdPrefix = useId();
    const searchInputId = `${fieldIdPrefix}-search`;
    const technologySelectId = `${fieldIdPrefix}-technology`;
    const categorySelectId = `${fieldIdPrefix}-category`;

    return (
        <ProjectBrowser.Filters>
            <ProjectBrowser.Field>
                <ProjectBrowser.Label htmlFor={searchInputId}>
                    _t(browser.search_label)
                </ProjectBrowser.Label>
                <AnimationComposer>
                    <FocusOutline />
                    <ProjectBrowser.SearchInput
                        id={searchInputId}
                        value={browserFilters.searchValue}
                        placeholder={browserFilters.searchPlaceholder}
                        onChange={browserFilters.onSearchChange}
                    />
                </AnimationComposer>
            </ProjectBrowser.Field>
            <ProjectBrowserSelectField
                selectId={technologySelectId}
                labelText="_t(browser.technology_label)"
                selectedValue={browserFilters.technologyValue}
                filterOptions={browserFilters.technologyOptions}
                onSelectChange={browserFilters.onTechnologyChange}
            />
            <ProjectBrowserSelectField
                selectId={categorySelectId}
                labelText="_t(browser.category_label)"
                selectedValue={browserFilters.categoryValue}
                filterOptions={browserFilters.categoryOptions}
                onSelectChange={browserFilters.onCategoryChange}
            />
            <AnimationComposer>
                <FocusOutline />
                <LinkHover />
                <ProjectBrowser.Reset disabled={!browserFilters.canReset} onClick={browserFilters.onReset}>
                    _t(browser.reset)
                </ProjectBrowser.Reset>
            </AnimationComposer>
        </ProjectBrowser.Filters>
    );
}

export { ProjectBrowserFilters };
