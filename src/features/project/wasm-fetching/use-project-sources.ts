import { useMemo } from "react";

import type { TerminalProject } from "@entities/project/model";


const RELEASE_PROXY_PREFIX = "/wasm";

interface UseProjectSourcesReturn {
    wasmSource: string;
    jsSource: string;
}

function repositoryPathOf(repositoryUrl: string): string {
    return new URL(repositoryUrl).pathname.replace(/\/+$/, "");
}

const useProjectSources = (
    project: TerminalProject
): UseProjectSourcesReturn => {
    const { wasmRepo, wasmTag, wasmArtifact, jsArtifact } = project;
    const releasePath = useMemo(() => {
        return `${RELEASE_PROXY_PREFIX}${repositoryPathOf(wasmRepo)}/${encodeURIComponent(wasmTag)}`;
    }, [wasmRepo, wasmTag]);

    return useMemo(() => ({
        wasmSource: `${releasePath}/${encodeURIComponent(wasmArtifact)}`,
        jsSource: `${releasePath}/${encodeURIComponent(jsArtifact)}`,
    }), [releasePath, wasmArtifact, jsArtifact]);
}

export { useProjectSources };
