import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { resolveKindLabel } from "@entities/projects/visual-map";

import { ALL_OPTION } from "../constants.ts";
import { useProjectBrowser } from "../context/use-project-browser.ts";

import type { CategoryFilter } from "../types.ts";
import type { ChangeEvent } from "react";


interface BrowserFilterOption {
    value: string;
    label: string;
}

interface UseBrowserFiltersReturn {
    searchValue: string;
    searchPlaceholder: string;
    technologyValue: string;
    categoryValue: string;
    technologyOptions: readonly BrowserFilterOption[];
    categoryOptions: readonly BrowserFilterOption[];
    canReset: boolean;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onTechnologyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onReset: () => void;
}

const useBrowserFilters = (): UseBrowserFiltersReturn => {
    const { t } = useTranslation();
    const {
        projects,
        searchQuery,
        technology,
        category,
        changeSearchQuery,
        changeTechnology,
        changeCategory,
        resetFilters,
    } = useProjectBrowser();

    const technologyOptions = useMemo((): BrowserFilterOption[] => {
        const uniqueTechnologies = [
            ...new Set(projects.flatMap((project) => project.tech))
        ];
        const sortedTechnologies = uniqueTechnologies.sort((leftTechnology, rightTechnology) => {
            return leftTechnology.localeCompare(rightTechnology);
        });

        return [
            {
                value: ALL_OPTION,
                label: t("browser.technology_all")
            },
            ...sortedTechnologies.map((technologyName) => ({
                value: technologyName,
                label: technologyName
            })),
        ];
    }, [projects, t]);

    const categoryOptions = useMemo((): BrowserFilterOption[] => {
        const projectKinds = [
            ...new Set(projects.map((project) => project.kind))
        ];

        return [
            {
                value: ALL_OPTION,
                label: t("browser.category_all")
            },
            ...projectKinds.map((projectKind) => ({
                value: projectKind,
                label: resolveKindLabel(projectKind)
            })),
        ];
    }, [projects, t]);

    const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        changeSearchQuery(event.target.value);
    }, [changeSearchQuery]);

    const onTechnologyChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        changeTechnology(event.target.value);
    }, [changeTechnology]);

    const onCategoryChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        changeCategory(event.target.value as CategoryFilter);
    }, [changeCategory]);

    return useMemo(() => {
        return {
            searchValue: searchQuery,
            searchPlaceholder: t("browser.search_placeholder"),
            technologyValue: technology,
            categoryValue: category,
            technologyOptions,
            categoryOptions,
            canReset: searchQuery !== "" || technology !== ALL_OPTION || category !== ALL_OPTION,
            onSearchChange,
            onTechnologyChange,
            onCategoryChange,
            onReset: resetFilters,
        };
    }, [
        t,
        searchQuery,
        technology,
        category,
        technologyOptions,
        categoryOptions,
        onSearchChange,
        onTechnologyChange,
        onCategoryChange,
        resetFilters,
    ]);
};

export { useBrowserFilters };
export type { BrowserFilterOption, UseBrowserFiltersReturn };
