import { useMemo } from "react";

import type { TerminalProject } from "@entities/projects/model";


interface UseProjectReleaseReturn {
    href: string;
    address: string;
}

const useProjectRelease = (project: TerminalProject): UseProjectReleaseReturn => {
    const { wasmRepo, wasmTag, wasmArtifact } = project;

    return useMemo(() => {
        const repository = wasmRepo.replace(/\/+$/, "");
        const program = wasmArtifact.replace(/\.wasm$/, "");

        return {
            href: `${repository}/releases/tag/${encodeURIComponent(wasmTag)}`,
            address: `${program} · ${wasmTag}`
        };
    }, [wasmRepo, wasmTag, wasmArtifact]);
};

export { useProjectRelease };
export type { UseProjectReleaseReturn };
