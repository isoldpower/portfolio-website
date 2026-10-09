import { markerIdOf, resolveConnectionTone, resolveToneColorClass } from "@entities/integration/visual-map";
import { cn } from "@shared/lib/utilities";

import { useFinanceInfraCanvas } from "./context/use-finance-infra-canvas.ts";

import type { FinanceInfraEmphasis, FinanceInfraRoutedConnection } from "@entities/integration/model";
import type { FC } from "react";


const EMPHASIS_CLASSES: Record<FinanceInfraEmphasis, string> = {
    default: "opacity-35",
    active: "opacity-100",
    muted: "opacity-[0.07]",
};

interface FinanceInfraCanvasEdgeProps {
    connection: FinanceInfraRoutedConnection;
}

const FinanceInfraCanvasEdge: FC<FinanceInfraCanvasEdgeProps> = ({ connection }) => {
    const { markerPrefix, connectionEmphasisOf } = useFinanceInfraCanvas();
    const { kind } = connection.connection;
    const tone = resolveConnectionTone(kind);
    const emphasis = connectionEmphasisOf(connection.connection);

    return (
        <path
            d={connection.path}
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

export { FinanceInfraCanvasEdge };
export type { FinanceInfraCanvasEdgeProps };
