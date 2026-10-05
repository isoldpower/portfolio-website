import { resolveKindIcon } from "../visual-map";

import type { ProjectKind } from "../model/types.ts";
import type { IconProps } from "@shared/ui-toolkit/icons";


type ProjectKindIconProps = IconProps & {
    kind: ProjectKind;
};

function ProjectKindIcon({
    kind,
    ...iconProps
}: ProjectKindIconProps) {
    const KindIcon = resolveKindIcon(kind);

    return <KindIcon {...iconProps} />;
}

export { ProjectKindIcon };
export type { ProjectKindIconProps };
