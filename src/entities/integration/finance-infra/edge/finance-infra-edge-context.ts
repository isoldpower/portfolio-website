import { createContext, use } from "react";

import type {
    FinanceConnectionTone,
    FinanceInfraEdgePulse,
    FinanceInfraEmphasis,
    FinanceInfraRoutedConnection
} from "@entities/integration/model";


interface FinanceInfraEdgePayload {
    connection: FinanceInfraRoutedConnection;
    tone: FinanceConnectionTone;
    emphasis: FinanceInfraEmphasis;
    pulse: FinanceInfraEdgePulse | null;
    markerPrefix: string;
}

const FinanceInfraEdgeContext = createContext<FinanceInfraEdgePayload | null>(null);

function useFinanceInfraEdge(): FinanceInfraEdgePayload {
    const context = use(FinanceInfraEdgeContext);

    if (context === null) {
        throw new Error("useFinanceInfraEdge must be used within a FinanceInfraCanvasEdge");
    }

    return context;
}

export { FinanceInfraEdgeContext, useFinanceInfraEdge };
export type { FinanceInfraEdgePayload };
