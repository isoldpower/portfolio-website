import { BodyText, Heading, InlineCode, MetaText } from "@shared/ui-toolkit/typography";

import type {
    EmbeddedProject,
    ProjectDetails,
    TerminalProject,
    WebProject
} from "@entities/project";


/*
 * Placeholders for each kind of demo. Each becomes its own widget once built:
 * a WebAssembly terminal, an embedded deployment with logs, and a streamed video.
 */

function TerminalShowcase({ project }: { project: TerminalProject }) {
    return (
        <section>
            <Heading>Terminal demo</Heading>
            <MetaText>{project.wasmRepo} @ {project.wasmTag}</MetaText>
            <BodyText>
                Runs <InlineCode>{project.jsArtifact}</InlineCode> with{" "}
                <InlineCode>{project.wasmArtifact}</InlineCode>
            </BodyText>
        </section>
    );
}

function WebShowcase({ project }: { project: WebProject }) {
    return (
        <section>
            <Heading>Web demo</Heading>
            <MetaText>{project.deployUrl}</MetaText>
            {project.earlyAccess ? (
                <BodyText>Early access: {project.availableTo.join(", ")}</BodyText>
            ) : null}
        </section>
    );
}

function EmbeddedShowcase({ project }: { project: EmbeddedProject }) {
    return (
        <section>
            <Heading>Video showcase</Heading>
            <BodyText>
                {project.video ? `Mux playback: ${project.video.playbackId}` : "No video uploaded"}
            </BodyText>
            <MetaText>{project.photos.length} photos</MetaText>
        </section>
    );
}

interface ProjectShowcaseProps {
    project: ProjectDetails;
}

function ProjectShowcase({
    project
}: ProjectShowcaseProps) {
    switch (project.kind) {
        case "terminal":
            return <TerminalShowcase project={project} />;
        case "web":
            return <WebShowcase project={project} />;
        case "embedded":
            return <EmbeddedShowcase project={project} />;
    }
}

export { ProjectShowcase };
export type { ProjectShowcaseProps };
