import { useCallback } from "react";

import { resolveKindLabel } from "@entities/projects/visual-map";

import { ALL_OPTION } from "../constants.ts";

import type { ProjectBrowserState } from "../types.ts";
import type { ProjectCard } from "@entities/projects/model";


type UseProjectMatchingReturn = (project: ProjectCard, filters: Omit<ProjectBrowserState, "pageIndex">) => boolean;

const useProjectMatching = (): UseProjectMatchingReturn => {
    const searchableTextOf = useCallback((project: ProjectCard): string => {
        return [
            project.title,
            resolveKindLabel(project.kind),
            ...Object.values(project.description),
            ...project.tech,
        ].join(" ").toLowerCase();
    }, []);

    return useCallback((project, { searchQuery, technology, category }) => {
        const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
        const searchableText = searchableTextOf(project);
        const matchesSearch = searchTerms.every((searchTerm) => {
            return searchableText.includes(searchTerm);
        });
        const matchesTechnology = technology === ALL_OPTION || project.tech.includes(technology);
        const matchesCategory = category === ALL_OPTION || project.kind === category;

        return matchesSearch && matchesTechnology && matchesCategory;
    }, [searchableTextOf]);
};

export { useProjectMatching };
export type { UseProjectMatchingReturn };
