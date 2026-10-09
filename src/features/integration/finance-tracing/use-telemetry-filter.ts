import { useCallback } from "react";

import type { FinanceTopology, FinanceTopologyConnection, FinanceTopologyNode } from "@entities/integration/model";


type UseTelemetryFilterReturn = (topology: FinanceTopology) => FinanceTopology;

const useTelemetryFilter = (): UseTelemetryFilterReturn => {
    const idsOf = useCallback((nodes: FinanceTopologyNode[]): ReadonlySet<string> => {
        return new Set(nodes.map((node) => {
            return node.id;
        }));
    }, []);

    const withoutObservability = useCallback((nodes: FinanceTopologyNode[]): FinanceTopologyNode[] => {
        return nodes.filter((node) => {
            return node.type !== "observability";
        });
    }, []);

    const withoutOrphanedTopics = useCallback((
        nodes: FinanceTopologyNode[],
        connections: FinanceTopologyConnection[]
    ): FinanceTopologyNode[] => {
        const nodeIds = idsOf(nodes);
        const publishedTopicIds = new Set(connections
            .filter((connection) => {
                return nodeIds.has(connection.from);
            })
            .map((connection) => {
                return connection.to;
            }));

        return nodes.filter((node) => {
            return node.type !== "topic" || publishedTopicIds.has(node.id);
        });
    }, [idsOf]);

    const visibleConnectionsOf = useCallback((
        nodes: FinanceTopologyNode[],
        connections: FinanceTopologyConnection[]
    ): FinanceTopologyConnection[] => {
        const nodeIds = idsOf(nodes);

        return connections.filter((connection) => {
            return connection.kind !== "telemetry"
                && nodeIds.has(connection.from)
                && nodeIds.has(connection.to);
        });
    }, [idsOf]);

    return useCallback((topology: FinanceTopology): FinanceTopology => {
        const nodes = withoutOrphanedTopics(withoutObservability(topology.nodes), topology.connections);

        return {
            ...topology,
            nodes,
            connections: visibleConnectionsOf(nodes, topology.connections),
        };
    }, [withoutObservability, withoutOrphanedTopics, visibleConnectionsOf]);
};

export { useTelemetryFilter };
export type { UseTelemetryFilterReturn };
