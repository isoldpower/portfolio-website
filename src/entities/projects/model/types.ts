import type { SanityImageSource } from "@sanity/image-url";
import type { LocalizedValue } from "@shared/lib/i18n";


type ProjectKind = "terminal" | "web" | "embedded";

type EarlyAccessAudience = "source_trusted" | "on_captcha" | "any_user";

interface ProjectTechnology {
    _id: string;
    title: string;
    iconUrl: string | null;
}

interface ProjectSourceRepo {
    _id: string;
    url: string;
    title: string;
    displayVersion: string;
    techStack: ProjectTechnology[];
}

interface ProjectPreview {
    _id: string;
    title: string;
    slug: string;
    summary: string | null;
    kind: ProjectKind;
    extraTech: ProjectTechnology[];
}

interface ProjectStory {
    roles: LocalizedValue;
    context: LocalizedValue;
    reflection: LocalizedValue;
}

type ProjectBase = ProjectPreview & {
    sourceRepos: ProjectSourceRepo[];
    story: ProjectStory;
};

interface ProjectLink {
    slug: string;
    title: string;
}

interface ProjectNeighbors {
    previous: ProjectLink | null;
    next: ProjectLink | null;
}

type TerminalProject = ProjectBase & {
    kind: "terminal";
    wasmRepo: string;
    wasmTag: string;
    jsArtifact: string;
    wasmArtifact: string;
};

type WebProject = ProjectBase & {
    kind: "web";
    deployUrl: string;
    earlyAccess: boolean;
    availableTo: EarlyAccessAudience[];
    searchIntegration: boolean;
};

interface ProjectVideo {
    playbackId: string;
    aspectRatio: string | null;
}

interface ProjectPhoto {
    src: string;
    width: number;
    height: number;
}

type EmbeddedProject = ProjectBase & {
    kind: "embedded";
    video: ProjectVideo | null;
    photos: SanityImageSource[];
    photoAssets: ProjectPhoto[];
    article: LocalizedValue;
    articleVideos: Record<string, ProjectVideo>;
};

type ProjectDetails = TerminalProject | WebProject | EmbeddedProject;

export type {
    ProjectKind,
    EarlyAccessAudience,
    ProjectTechnology,
    ProjectSourceRepo,
    ProjectPreview,
    TerminalProject,
    WebProject,
    ProjectVideo,
    EmbeddedProject,
    ProjectDetails,
    ProjectLink,
    ProjectPhoto,
    ProjectNeighbors,
    ProjectStory
};
