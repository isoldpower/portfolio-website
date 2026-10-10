import { useCallback, useMemo } from "react";

import type {
    FinanceDemoSpan,
    FinanceTelemetryAttributes,
    FinanceTopology,
    FinanceTopologyNode
} from "@entities/integration/model";


interface UseSpanNodesReturn {
    serviceNodeOf: (span: FinanceDemoSpan) => string | null;
    targetNodeOf: (span: FinanceDemoSpan) => string | null;
}

const useSpanNodes = (topology: FinanceTopology): UseSpanNodesReturn => {
    const nodesById = useMemo(() => {
        return new Map(topology.nodes.map((node) => {
            return [node.id, node];
        }));
    }, [topology.nodes]);

    const nodeIdByService = useMemo(() => {
        return new Map(topology.nodes.flatMap((node) => {
            return node.telemetry.serviceNames.map((serviceName) => {
                return [serviceName, node.id] as const;
            });
        }));
    }, [topology.nodes]);

    const neighbourIdsById = useMemo(() => {
        const neighbours = new Map<string, Set<string>>();

        for (const connection of topology.connections) {
            neighbours.set(connection.from, (neighbours.get(connection.from) ?? new Set()).add(connection.to));
            neighbours.set(connection.to, (neighbours.get(connection.to) ?? new Set()).add(connection.from));
        }

        return neighbours;
    }, [topology.connections]);

    const matchScoreOf = useCallback((node: FinanceTopologyNode, attributes: FinanceTelemetryAttributes): number => {
        const expected = Object.entries(node.telemetry.attributes);
        const isMatching = expected.every(([name, value]) => {
            return String(attributes[name]) === String(value);
        });

        return expected.length > 0 && isMatching ? expected.length : 0;
    }, []);

    const serviceNodeOf = useCallback((span: FinanceDemoSpan): string | null => {
        return nodeIdByService.get(span.service) ?? null;
    }, [nodeIdByService]);

    const targetNodeOf = useCallback((span: FinanceDemoSpan): string | null => {
        const serviceNodeId = serviceNodeOf(span);

        if (serviceNodeId === null) {
            return null;
        }

        let bestNodeId: string | null = null;
        let bestScore = 0;

        for (const neighbourId of neighbourIdsById.get(serviceNodeId) ?? []) {
            const neighbour = nodesById.get(neighbourId);
            const score = neighbour === undefined ? 0 : matchScoreOf(neighbour, span.attributes);

            if (score > bestScore) {
                bestNodeId = neighbourId;
                bestScore = score;
            }
        }

        return bestNodeId;
    }, [serviceNodeOf, neighbourIdsById, nodesById, matchScoreOf]);

    return useMemo(() => ({
        serviceNodeOf,
        targetNodeOf,
    }), [serviceNodeOf, targetNodeOf]);
};

export { useSpanNodes };
export type { UseSpanNodesReturn };
