import { useCallback } from "react";

import type { EmbeddedProject, ProjectPhoto, ProjectVideo } from "@entities/projects/model";


type ArticleMedia =
    | { kind: "video"; video: ProjectVideo }
    | { kind: "photo"; photo: ProjectPhoto }
    | { kind: "image"; src: string }
    | { kind: "missing"; reference: string };

type UseArticleMediaReturn = (source: string) => ArticleMedia;

const SHOWCASE_VIDEO_KEY = "showcase";

const useArticleMedia = (project: EmbeddedProject): UseArticleMediaReturn => {
    return useCallback((source: string): ArticleMedia => {
        const [scheme, reference = ""] = source.split(":", 2);

        if (scheme === "video") {
            const video = reference === SHOWCASE_VIDEO_KEY
                ? project.video
                : project.articleVideos[reference];

            return video
                ? { kind: "video", video }
                : { kind: "missing", reference: source };
        }
        if (scheme === "photo") {
            const photo = project.photoAssets[Number(reference) - 1];

            return photo
                ? { kind: "photo", photo }
                : { kind: "missing", reference: source };
        }

        return {
            kind: "image",
            src: source
        };
    }, [project.video, project.articleVideos, project.photoAssets]);
};

export { useArticleMedia };
export type { ArticleMedia, UseArticleMediaReturn };
