import { useCallback, useMemo, useState } from "react";

import { ALL_OPTION, PROJECTS_PER_PAGE } from "../constants.ts";
import { useProjectMatching } from "./use-project-matching.ts";

import type { CategoryFilter, ProjectBrowserContextValue, ProjectBrowserState } from "../types.ts";
import type { ProjectCard } from "@entities/projects/model";


interface UseProjectBrowserStateParams {
    projects: readonly ProjectCard[];
    scrollTargetId: string;
}

type UseProjectBrowserStateReturn = ProjectBrowserContextValue;

const INITIAL_BROWSER_STATE: ProjectBrowserState = {
    searchQuery: "",
    technology: ALL_OPTION,
    category: ALL_OPTION,
    pageIndex: 0,
};

const useProjectBrowserState = ({
    projects,
    scrollTargetId,
}: UseProjectBrowserStateParams): UseProjectBrowserStateReturn => {
    const [browserState, setBrowserState] = useState<ProjectBrowserState>(INITIAL_BROWSER_STATE);
    const isProjectMatching = useProjectMatching();

    const matchingProjects = useMemo(() => {
        return projects.filter((project) => {
            return isProjectMatching(project, browserState);
        });
    }, [projects, isProjectMatching, browserState]);

    const pageCount = Math.max(
        1,
        Math.ceil(matchingProjects.length / PROJECTS_PER_PAGE)
    );
    const visiblePageIndex = Math.min(
        browserState.pageIndex,
        pageCount - 1
    );

    const pageProjects = useMemo(() => {
        return matchingProjects.slice(
            visiblePageIndex * PROJECTS_PER_PAGE,
            (visiblePageIndex + 1) * PROJECTS_PER_PAGE
        );
    }, [matchingProjects, visiblePageIndex]);

    const changeFilters = useCallback((filterChanges: Partial<Omit<ProjectBrowserState, "pageIndex">>) => {
        setBrowserState((currentState) => {
            return { ...currentState, ...filterChanges, pageIndex: 0 };
        });
    }, []);

    const changeSearchQuery = useCallback((searchQuery: string) => {
        changeFilters({ searchQuery });
    }, [changeFilters]);

    const changeTechnology = useCallback((technology: string) => {
        changeFilters({ technology });
    }, [changeFilters]);

    const changeCategory = useCallback((category: CategoryFilter) => {
        changeFilters({ category });
    }, [changeFilters]);

    const resetFilters = useCallback(() => {
        setBrowserState(INITIAL_BROWSER_STATE);
    }, []);

    const changePage = useCallback((nextPageIndex: number) => {
        setBrowserState((currentState) => {
            return { ...currentState, pageIndex: nextPageIndex };
        });

        const scrollTarget = document.getElementById(scrollTargetId);
        if (scrollTarget && scrollTarget.getBoundingClientRect().top < 0) {
            scrollTarget.scrollIntoView({ block: "start" });
        }
    }, [scrollTargetId]);

    return useMemo(() => {
        return {
            ...browserState,
            pageIndex: visiblePageIndex,
            projects,
            matchingProjects,
            pageProjects,
            pageCount,
            changeSearchQuery,
            changeTechnology,
            changeCategory,
            changePage,
            resetFilters,
        };
    }, [
        browserState,
        visiblePageIndex,
        projects,
        matchingProjects,
        pageProjects,
        pageCount,
        changeSearchQuery,
        changeTechnology,
        changeCategory,
        changePage,
        resetFilters,
    ]);
};

export { useProjectBrowserState };
export type { UseProjectBrowserStateParams, UseProjectBrowserStateReturn };
