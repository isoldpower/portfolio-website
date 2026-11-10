import type { ProjectKind } from "../model/types.ts";


const LABEL_BY_KIND: Record<ProjectKind, string> = {
    terminal: "Terminal",
    web: "Web",
    embedded: "Embedded",
};

function resolveKindLabel(kind: ProjectKind): string {
    return LABEL_BY_KIND[kind];
}

export { resolveKindLabel };
