import type { LocalizedValue } from "@shared/lib/i18n";
import type { SanityClient } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url";


type ProjectApiClient = Pick<SanityClient, "fetch">;

interface ProjectApiServers {
    projectApi: ProjectApiClient;
}

type ProjectKindDto = "terminal" | "web" | "embedded";

type EarlyAccessAudienceDto = "source_trusted" | "on_captcha" | "any_user";

interface SlugDto {
    current: string;
}

interface ProjectTechnologyDto {
    _id: string;
    title: string;
    icon_url: string | null;
}

interface ProjectSourceRepoDto {
    _id: string;
    url: string;
    title: string;
    display_version: string;
    tech_stack: ProjectTechnologyDto[] | null;
}

interface ProjectPreviewDto {
    _id: string;
    title: string;
    slug: SlugDto;
    summary: string | null;
    kind: ProjectKindDto;
    extra_tech: ProjectTechnologyDto[] | null;
}

type ProjectBaseDto = ProjectPreviewDto & {
    source_repos: ProjectSourceRepoDto[] | null;
    roles: LocalizedValue | null;
    context: LocalizedValue | null;
    reflection: LocalizedValue | null;
};

type TerminalProjectDto = ProjectBaseDto & {
    kind: "terminal";
    wasm_repo: string;
    wasm_tag: string;
    js_artifact: string;
    wasm_artifact: string;
};

type WebProjectDto = ProjectBaseDto & {
    kind: "web";
    deploy_url: string;
    has_access_key: boolean;
    available_to: EarlyAccessAudienceDto[] | null;
    search_integration: boolean | null;
};

interface ProjectVideoDto {
    playbackId: string;
    data: {
        aspect_ratio?: string;
    } | null;
}

interface ProjectPhotoAssetDto {
    url: string | null;
    width: number | null;
    height: number | null;
}

interface ArticleVideoDto {
    key: string | null;
    asset: ProjectVideoDto | null;
}

type EmbeddedProjectDto = ProjectBaseDto & {
    kind: "embedded";
    video: ProjectVideoDto | null;
    photos: SanityImageSource[] | null;
    photo_assets: ProjectPhotoAssetDto[] | null;
    article: LocalizedValue | null;
    videos: ArticleVideoDto[] | null;
};

type ProjectDetailsDto = TerminalProjectDto | WebProjectDto | EmbeddedProjectDto;

export type {
    ProjectApiClient,
    ProjectApiServers,
    ProjectKindDto,
    EarlyAccessAudienceDto,
    SlugDto,
    ProjectTechnologyDto,
    ProjectSourceRepoDto,
    ProjectPreviewDto,
    TerminalProjectDto,
    WebProjectDto,
    ProjectVideoDto,
    EmbeddedProjectDto,
    ProjectPhotoAssetDto,
    ArticleVideoDto,
    ProjectDetailsDto
};
