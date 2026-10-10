import { markerIdOf } from "@entities/integration/visual-map";
import { cn } from "@shared/lib/utilities";

import { useFinanceInfraEdge } from "./finance-infra-edge-context.ts";

import type { FinanceInfraEmphasis } from "@entities/integration/model";
import type { FC } from "react";


const EMPHASIS_CLASSES: Record<FinanceInfraEmphasis, string> = {
    default: "opacity-35",
    active: "opacity-100",
    muted: "opacity-[0.07]",
};

const FinanceInfraEdgePath: FC = () => {
    const { connection, tone, emphasis, markerPrefix } = useFinanceInfraEdge();
    const { kind } = connection.connection;

    return (
        <path
            d={connection.path}
            fill="none"
            stroke="currentColor"
            strokeWidth={emphasis === "active" ? 1.75 : 1.25}
            strokeDasharray={kind === "cdc" || kind === "push" ? "4 3" : undefined}
            markerEnd={`url(#${markerIdOf(markerPrefix, tone)})`}
            className={cn("transition-opacity duration-200", EMPHASIS_CLASSES[emphasis])}
        />
    );
};

FinanceInfraEdgePath.displayName = "FinanceInfraEdgePath";

export { FinanceInfraEdgePath };
