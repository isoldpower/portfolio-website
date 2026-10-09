import { useCallback, useMemo, useState } from "react";

import { useFocusHandlers } from "./use-focus-handlers.ts";
import { useNeighbourIds } from "./use-neighbour-ids.ts";

import type {
    FinanceInfraEmphasis,
    FinanceInfraFocusHandlers,
    FinanceTopologyConnection
} from "@entities/integration/model";


interface UseNodeFocusReturn {
    focusHandlers: FinanceInfraFocusHandlers;
    nodeEmphasisOf: (nodeId: string) => FinanceInfraEmphasis;
    connectionEmphasisOf: (connection: FinanceTopologyConnection) => FinanceInfraEmphasis;
}

const useNodeFocus = (connections: FinanceTopologyConnection[]): UseNodeFocusReturn => {
    const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
    const focusHandlers = useFocusHandlers(setFocusedNodeId);
    const neighbourIds = useNeighbourIds({ connections, nodeId: focusedNodeId });

    const nodeEmphasisOf = useCallback((nodeId: string): FinanceInfraEmphasis => {
        if (focusedNodeId === null) {
            return "default";
        }

        return nodeId === focusedNodeId || neighbourIds.has(nodeId) ? "active" : "muted";
    }, [focusedNodeId, neighbourIds]);
    const connectionEmphasisOf = useCallback((connection: FinanceTopologyConnection): FinanceInfraEmphasis => {
        if (focusedNodeId === null) {
            return "default";
        }

        return connection.from === focusedNodeId || connection.to === focusedNodeId ? "active" : "muted";
    }, [focusedNodeId]);

    return useMemo(() => ({
        focusHandlers,
        nodeEmphasisOf,
        connectionEmphasisOf,
    }), [focusHandlers, nodeEmphasisOf, connectionEmphasisOf]);
};

export { useNodeFocus };
export type { UseNodeFocusReturn };
