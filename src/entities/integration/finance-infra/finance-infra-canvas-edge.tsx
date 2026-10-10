import { useMemo } from "react";

import { resolveConnectionTone, resolveToneColorClass } from "@entities/integration/visual-map";

import { useFinanceInfraCanvas } from "./context/use-finance-infra-canvas.ts";
import { FinanceInfraEdgeContext } from "./edge/finance-infra-edge-context.ts";
import { FinanceInfraEdgePath } from "./edge/finance-infra-edge-path.tsx";
import { FinanceInfraEdgePulse } from "./edge/finance-infra-edge-pulse.tsx";

import type { FinanceInfraEdgePayload } from "./edge/finance-infra-edge-context.ts";
import type { FinanceInfraRoutedConnection } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasEdgeProps {
    connection: FinanceInfraRoutedConnection;
    children: ReactNode;
}

type FinanceInfraCanvasEdgeObject = FC<FinanceInfraCanvasEdgeProps> & {
    Path: FC;
    Pulse: FC;
};

const FinanceInfraCanvasEdge: FinanceInfraCanvasEdgeObject = ({ connection, children }) => {
    const { markerPrefix, connectionEmphasisOf, connectionPulseOf } = useFinanceInfraCanvas();
    const tone = resolveConnectionTone(connection.connection.kind);
    const emphasis = connectionEmphasisOf(connection.connection);
    const pulse = connectionPulseOf(connection.connection);

    const edgeContext = useMemo<FinanceInfraEdgePayload>(() => ({
        connection,
        tone,
        emphasis,
        pulse,
        markerPrefix,
    }), [connection, tone, emphasis, pulse, markerPrefix]);

    return (
        <FinanceInfraEdgeContext value={edgeContext}>
            <g className={resolveToneColorClass(tone)}>
                {children}
            </g>
        </FinanceInfraEdgeContext>
    );
};

FinanceInfraCanvasEdge.Path = FinanceInfraEdgePath;
FinanceInfraCanvasEdge.Pulse = FinanceInfraEdgePulse;
FinanceInfraCanvasEdge.displayName = "FinanceInfraCanvasEdge";

export { FinanceInfraCanvasEdge };
export type { FinanceInfraCanvasEdgeProps };
