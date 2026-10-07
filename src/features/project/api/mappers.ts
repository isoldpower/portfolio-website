import type {
    EmbeddedProjectDto,
    ProjectDetailsDto,
    ProjectPreviewDto,
    ProjectSourceRepoDto,
    ProjectTechnologyDto,
    ProjectVideoDto,
    TerminalProjectDto,
    WebProjectDto
} from "./types.ts";
import type {
    EmbeddedProject,
    ProjectDetails,
    ProjectPreview,
    ProjectSourceRepo,
    ProjectTechnology,
    ProjectVideo,
    TerminalProject,
    WebProject
} from "@entities/project/model";


function mapTechnology(dto: ProjectTechnologyDto): ProjectTechnology {
    return {
        _id: dto._id,
        title: dto.title,
        iconUrl: dto.icon_url,
    };
}

function mapSourceRepo(dto: ProjectSourceRepoDto): ProjectSourceRepo {
    return {
        _id: dto._id,
        url: dto.url,
        title: dto.title,
        displayVersion: dto.display_version,
        techStack: (dto.tech_stack ?? []).map(mapTechnology),
    };
}

function mapVideo(dto: ProjectVideoDto): ProjectVideo {
    return {
        playbackId: dto.playbackId,
        aspectRatio: dto.data?.aspect_ratio ?? null,
    };
}

function mapProjectPreview(dto: ProjectPreviewDto): ProjectPreview {
    return {
        _id: dto._id,
        title: dto.title,
        slug: dto.slug.current,
        summary: dto.summary,
        kind: dto.kind,
        extraTech: (dto.extra_tech ?? []).map(mapTechnology),
    };
}

function mapProjectBase(dto: ProjectDetailsDto) {
    return {
        ...mapProjectPreview(dto),
        sourceRepos: (dto.source_repos ?? []).map(mapSourceRepo),
    };
}

function mapTerminalProject(dto: TerminalProjectDto): TerminalProject {
    return {
        ...mapProjectBase(dto),
        kind: "terminal",
        wasmRepo: dto.wasm_repo,
        wasmTag: dto.wasm_tag,
        jsArtifact: dto.js_artifact,
        wasmArtifact: dto.wasm_artifact,
    };
}

function mapWebProject(dto: WebProjectDto): WebProject {
    return {
        ...mapProjectBase(dto),
        kind: "web",
        deployUrl: dto.deploy_url,
        earlyAccess: dto.has_access_key,
        availableTo: dto.available_to ?? [],
        searchIntegration: dto.search_integration ?? false,
    };
}

function mapEmbeddedProject(dto: EmbeddedProjectDto): EmbeddedProject {
    return {
        ...mapProjectBase(dto),
        kind: "embedded",
        video: dto.video === null ? null : mapVideo(dto.video),
        photos: dto.photos ?? [],
    };
}

function mapProjectDetails(dto: ProjectDetailsDto): ProjectDetails {
    switch (dto.kind) {
        case "terminal":
            return mapTerminalProject(dto);
        case "web":
            return mapWebProject(dto);
        case "embedded":
            return mapEmbeddedProject(dto);
    }
}

export {
    mapTechnology,
    mapSourceRepo,
    mapVideo,
    mapProjectPreview,
    mapProjectDetails
};
