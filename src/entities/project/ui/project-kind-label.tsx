import { Overline } from "@shared/ui-toolkit/typography";

import { resolveKindLabel } from "../visual-map";
import { ProjectKindIcon } from "./project-kind-icon.tsx";

import type { ProjectKind } from "../model/types.ts";


interface ProjectKindLabelProps {
    kind: ProjectKind;
}

function ProjectKindLabel({
    kind
}: ProjectKindLabelProps) {
    return (
        <Overline className="inline-flex items-center gap-1.5">
            <ProjectKindIcon kind={kind} size={12} />
            {resolveKindLabel(kind)}
        </Overline>
    );
}

export { ProjectKindLabel };
export type { ProjectKindLabelProps };
