import { ChipIcon, GlobeIcon, TerminalIcon } from "@shared/ui-toolkit/icons";

import type { ProjectKind } from "../model/types.ts";
import type { IconProps } from "@shared/ui-toolkit/icons";
import type { FunctionComponent } from "react";


const ICON_BY_KIND: Record<ProjectKind, FunctionComponent<IconProps>> = {
    terminal: TerminalIcon,
    web: GlobeIcon,
    embedded: ChipIcon,
};

function resolveKindIcon(kind: ProjectKind): FunctionComponent<IconProps> {
    return ICON_BY_KIND[kind];
}

export { resolveKindIcon };
