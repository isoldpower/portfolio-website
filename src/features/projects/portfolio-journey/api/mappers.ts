import { JOURNEY_THEMES } from "@entities/projects/model";
import { proxiedImageUrl } from "@shared/lib/utilities";

import { MAX_JOURNEY_SCREENSHOTS, MAX_JOURNEY_TECH } from "../constants.ts";

import type { FavoriteProjectDto, FavoriteProjectsDto, JourneyScreenshotDto } from "./types.ts";
import type { JourneyScreenshot, JourneyStop, JourneyTheme, PortfolioJourney } from "@entities/projects/model";


const isJourneyTheme = (sceneryName: string | null): sceneryName is JourneyTheme => {
    return JOURNEY_THEMES.includes(sceneryName as JourneyTheme);
};

const mapScreenshot = (screenshotDto: JourneyScreenshotDto): JourneyScreenshot | null => {
    if (!screenshotDto.url || !screenshotDto.width || !screenshotDto.height) {
        return null;
    }

    return {
        key: screenshotDto._key,
        src: proxiedImageUrl(screenshotDto.url),
        width: screenshotDto.width,
        height: screenshotDto.height,
        label: screenshotDto.label,
        alt: screenshotDto.alt ?? {},
    };
};

const mapScreenshots = (screenshotDtos: JourneyScreenshotDto[] | null): JourneyScreenshot[] => {
    return (screenshotDtos ?? [])
        .map(mapScreenshot)
        .filter((mappedScreenshot): mappedScreenshot is JourneyScreenshot => mappedScreenshot !== null)
        .slice(0, MAX_JOURNEY_SCREENSHOTS);
};

const interleaveRepoTech = (projectDto: FavoriteProjectDto): (string | null)[] => {
    const techTitlesPerRepo = (projectDto.repo_tech ?? []).map((repoTechDto) => {
        return repoTechDto.titles ?? [];
    });
    const longestTechListLength = Math.max(0, ...techTitlesPerRepo.map((repoTechTitles) => {
        return repoTechTitles.length;
    }));

    return Array.from({ length: longestTechListLength }, (_, techIndex) => {
        return techTitlesPerRepo.map((repoTechTitles) => {
            return repoTechTitles[techIndex] ?? null;
        });
    }).flat();
};

const uniqueTechTitles = (projectDto: FavoriteProjectDto): string[] => {
    const techTitles = [...interleaveRepoTech(projectDto), ...(projectDto.extra_tech ?? [])];
    const presentTechTitles = techTitles.filter((techTitle): techTitle is string => {
        return Boolean(techTitle);
    });

    return [...new Set(presentTechTitles)].slice(0, MAX_JOURNEY_TECH);
};

const mapFavoriteProject = (projectDto: FavoriteProjectDto): JourneyStop | null => {
    const journeyDto = projectDto.journey;
    if (!projectDto.slug || !journeyDto || !isJourneyTheme(journeyDto.scenery)) {
        return null;
    }

    return {
        key: projectDto._id,
        slug: projectDto.slug,
        title: projectDto.title,
        theme: journeyDto.scenery,
        locationTitle: journeyDto.location_title ?? "",
        checkpoint: journeyDto.checkpoint ?? "",
        description: journeyDto.description ?? {},
        tech: uniqueTechTitles(projectDto),
        screenshots: mapScreenshots(journeyDto.screenshots),
    };
};

const mapPortfolioJourney = (projectDtos: FavoriteProjectsDto): PortfolioJourney => ({
    stops: projectDtos
        .map(mapFavoriteProject)
        .filter((journeyStop): journeyStop is JourneyStop => journeyStop !== null),
});

export { mapPortfolioJourney };
