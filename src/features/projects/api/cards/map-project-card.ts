import { proxiedImageUrl } from "@shared/lib/utilities";

import type { ProjectCardDto, ProjectCardImageDto } from "./types.ts";
import type { ProjectCard, ProjectCardImage } from "@entities/projects/model";


const CARD_IMAGE_WIDTHS = [320, 640, 960] as const;
const CARD_IMAGE_DEFAULT_WIDTH = 640;

const cardImageUrl = (url: string, width: number): string => {
    return proxiedImageUrl(`${url}?w=${String(width)}&auto=format`);
};

const mapCardImage = (dto: ProjectCardImageDto | null): ProjectCardImage | null => {
    if (!dto?.url || !dto.width || !dto.height) {
        return null;
    }

    const { url } = dto;

    return {
        src: cardImageUrl(url, CARD_IMAGE_DEFAULT_WIDTH),
        srcSet: CARD_IMAGE_WIDTHS.map((width) => `${cardImageUrl(url, width)} ${String(width)}w`).join(", "),
        width: dto.width,
        height: dto.height,
        alt: dto.alt ?? {},
    };
};

const uniqueTech = (dto: ProjectCardDto): string[] => {
    const titles = [
        ...(dto.repo_tech ?? []),
        ...(dto.extra_tech ?? [])
    ].filter((title): title is string => Boolean(title));

    return [...new Set(titles)];
};

const mapProjectCard = (dto: ProjectCardDto): ProjectCard => {
    return {
        key: dto._id,
        slug: dto.slug,
        title: dto.title,
        kind: dto.kind,
        description: dto.journey_description ?? (dto.summary ? { en: dto.summary } : {}),
        tech: uniqueTech(dto),
        image: mapCardImage(dto.image),
    };
};

export { mapProjectCard };
