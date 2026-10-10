import { useCallback, useMemo } from "react";

import { baseNodeIdOf } from "../finance-node-instances";
import { hopKeyOf } from "./hop-key.ts";

import type {
    FinanceInfraEdgePulse,
    FinanceInfraEmphasis,
    FinanceRequestFlow,
    FinanceTopologyConnection
} from "@entities/integration/model";


interface FocusEmphasis {
    nodeEmphasisOf: (nodeId: string) => FinanceInfraEmphasis;
    connectionEmphasisOf: (connection: FinanceTopologyConnection) => FinanceInfraEmphasis;
}

interface UseFlowEmphasisParams {
    focus: FocusEmphasis;
    flow: FinanceRequestFlow;
}

interface UseFlowEmphasisReturn extends FocusEmphasis {
    connectionPulseOf: (connection: FinanceTopologyConnection) => FinanceInfraEdgePulse | null;
}

const useFlowEmphasis = ({ focus, flow }: UseFlowEmphasisParams): UseFlowEmphasisReturn => {
    const { nodeEmphasisOf: focusNodeEmphasisOf, connectionEmphasisOf: focusConnectionEmphasisOf } = focus;
    const hopOrderByKey = useMemo(() => {
        return new Map(flow.hops.map((hop, order) => {
            return [hopKeyOf(hop.from, hop.to), order];
        }));
    }, [flow.hops]);

    const hopOrderOf = useCallback((connection: FinanceTopologyConnection): number | undefined => {
        return hopOrderByKey.get(hopKeyOf(baseNodeIdOf(connection.from), baseNodeIdOf(connection.to)));
    }, [hopOrderByKey]);

    const nodeEmphasisOf = useCallback((nodeId: string): FinanceInfraEmphasis => {
        const focusEmphasis = focusNodeEmphasisOf(nodeId);

        if (focusEmphasis !== "default") {
            return focusEmphasis;
        }

        return flow.nodeIds.has(baseNodeIdOf(nodeId)) ? "active" : "default";
    }, [focusNodeEmphasisOf, flow.nodeIds]);

    const connectionEmphasisOf = useCallback((connection: FinanceTopologyConnection): FinanceInfraEmphasis => {
        const focusEmphasis = focusConnectionEmphasisOf(connection);

        if (focusEmphasis !== "default") {
            return focusEmphasis;
        }

        return hopOrderOf(connection) === undefined ? "default" : "active";
    }, [focusConnectionEmphasisOf, hopOrderOf]);

    const connectionPulseOf = useCallback((connection: FinanceTopologyConnection): FinanceInfraEdgePulse | null => {
        const order = hopOrderOf(connection);

        return order === undefined ? null : { order, total: flow.hops.length };
    }, [hopOrderOf, flow.hops.length]);

    return useMemo(() => ({
        nodeEmphasisOf,
        connectionEmphasisOf,
        connectionPulseOf,
    }), [nodeEmphasisOf, connectionEmphasisOf, connectionPulseOf]);
};

export { useFlowEmphasis };
export type { UseFlowEmphasisParams, UseFlowEmphasisReturn };
