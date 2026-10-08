import { cn } from "@shared/lib/utilities";

import { resolveConnectionTone, resolveToneColorClass } from "../visual-map";

import { markerIdOf } from "./finance-infra-edge-layer.tsx";

import type { FinanceInfraEmphasis } from "../model/types.ts";
import type { FinanceConnectionKind } from "@entities/integration/model";
import type { FC } from "react";


const EMPHASIS_CLASSES: Record<FinanceInfraEmphasis, string> = {
    default: "opacity-35",
    active: "opacity-100",
    muted: "opacity-[0.07]",
};

interface FinanceInfraEdgeProps {
    path: string;
    kind: FinanceConnectionKind;
    markerPrefix: string;
    emphasis?: FinanceInfraEmphasis;
}

const FinanceInfraEdge: FC<FinanceInfraEdgeProps> = ({
    path,
    kind,
    markerPrefix,
    emphasis = "default"
}) => {
    const tone = resolveConnectionTone(kind);

    return (
        <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth={emphasis === "active" ? 1.75 : 1.25}
            strokeDasharray={kind === "cdc" || kind === "push" ? "4 3" : undefined}
            markerEnd={`url(#${markerIdOf(markerPrefix, tone)})`}
            className={cn(
                "transition-opacity duration-200",
                resolveToneColorClass(tone),
                EMPHASIS_CLASSES[emphasis]
            )}
        />
    );
};

export { FinanceInfraEdge };
export type { FinanceInfraEdgeProps };
