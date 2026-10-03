interface ReleaseArtifactParams {
    owner: string;
    repo: string;
    tag: string;
    artifact: string;
}

const ALLOWED_OWNERS = new Set(["isoldpower"]);

const CONTENT_TYPES: Record<string, string> = {
    ".js": "text/javascript",
    ".wasm": "application/wasm",
};

function contentTypeOf(artifact: string): string | undefined {
    return CONTENT_TYPES[artifact.slice(artifact.lastIndexOf("."))];
}

function isAllowedOwner(owner: string): boolean {
    return ALLOWED_OWNERS.has(owner);
}

function releaseAssetUrl({ owner, repo, tag, artifact }: ReleaseArtifactParams): string {
    const repository = `${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;

    return `https://github.com/${repository}/releases/download/${encodeURIComponent(tag)}/${encodeURIComponent(artifact)}`;
}

export { contentTypeOf, isAllowedOwner, releaseAssetUrl };
export type { ReleaseArtifactParams };
