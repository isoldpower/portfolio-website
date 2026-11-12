import type { ProjectKind } from "./types.ts";
import type { LocalizedValue } from "@shared/lib/i18n";


interface ProjectCardImage {
    src: string;
    srcSet: string;
    width: number;
    height: number;
    alt: LocalizedValue;
}

interface ProjectCard {
    key: string;
    slug: string;
    title: string;
    kind: ProjectKind;
    description: LocalizedValue;
    tech: string[];
    image: ProjectCardImage | null;
}

export type { ProjectCard, ProjectCardImage };
