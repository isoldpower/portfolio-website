import { useMemo } from "react";

import type { ProjectSourceRepo } from "@entities/projects/model";


interface RepoCard {
    id: string;
    href: string;
    title: string;
    path: string;
    version: string;
    tech: string;
}

const useRepoCards = (repos: ProjectSourceRepo[]): RepoCard[] => useMemo(() => {
    const toPath = (url: string) => {
        try {
            const { hostname, pathname } = new URL(url);
            const path = pathname
                .replace(/^\/+|\/+$/g, "")
                .replace(/\.git$/, "");

            return hostname === "github.com" ? path : `${hostname}/${path}`;
        } catch {
            return url;
        }
    };

    return repos.map((repo) => ({
        id: repo._id,
        href: repo.url,
        title: repo.title,
        path: toPath(repo.url),
        version: repo.displayVersion,
        tech: repo.techStack.map((technology) => technology.title).join(" · ")
    }));
}, [repos]);

export { useRepoCards };
export type { RepoCard };
