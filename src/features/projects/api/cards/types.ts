import type { ProjectKindDto } from "../types.ts";
import type { LocalizedValue } from "@shared/lib/i18n";


interface ProjectCardImageDto {
    alt: LocalizedValue | null;
    url: string | null;
    width: number | null;
    height: number | null;
}

interface ProjectCardDto {
    _id: string;
    title: string;
    slug: string;
    kind: ProjectKindDto;
    summary: string | null;
    journey_description: LocalizedValue | null;
    repo_tech: (string | null)[] | null;
    extra_tech: (string | null)[] | null;
    image: ProjectCardImageDto | null;
}

export type { ProjectCardDto, ProjectCardImageDto };
