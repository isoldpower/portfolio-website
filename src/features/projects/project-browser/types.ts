import type { ALL_OPTION } from "./constants.ts";
import type { ProjectCard, ProjectKind } from "@entities/projects/model";


type CategoryFilter = ProjectKind | typeof ALL_OPTION;

interface ProjectBrowserState {
    searchQuery: string;
    technology: string;
    category: CategoryFilter;
    pageIndex: number;
}

interface ProjectBrowserContextValue extends ProjectBrowserState {
    projects: readonly ProjectCard[];
    matchingProjects: readonly ProjectCard[];
    pageProjects: readonly ProjectCard[];
    pageCount: number;
    changeSearchQuery: (searchQuery: string) => void;
    changeTechnology: (technology: string) => void;
    changeCategory: (category: CategoryFilter) => void;
    changePage: (pageIndex: number) => void;
    resetFilters: () => void;
}

export type { CategoryFilter, ProjectBrowserContextValue, ProjectBrowserState };
