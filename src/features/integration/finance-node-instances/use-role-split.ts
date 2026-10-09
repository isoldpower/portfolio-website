import { useCallback, useMemo } from "react";
import { roleIdOf } from "./role-id.ts";
import { useDualRoleIds } from "./use-dual-role-ids.ts";

import type { FinanceTopology, FinanceTopologyConnection, FinanceTopologyNode } from "@entities/integration/model";


const useRoleSplit = (topology: FinanceTopology): FinanceTopology => {
    const topicIds = useMemo(() => {
        return new Set(topology.nodes
            .filter((node) => {
                return node.type === "topic";
            })
            .map((node) => {
                return node.id;
            }));
    }, [topology.nodes]);

    const dualRoleIds = useDualRoleIds({
        nodes: topology.nodes,
        connections: topology.connections,
        topicIds
    });

    const rolesOf = useCallback((node: FinanceTopologyNode): FinanceTopologyNode[] => {
        if (!dualRoleIds.has(node.id)) {
            return [node];
        }

        return [
            { ...node, id: roleIdOf(node.id, "requests") },
            { ...node, id: roleIdOf(node.id, "kafka") },
        ];
    }, [dualRoleIds]);

    const endpointOf = useCallback((endpointId: string, otherId: string) => {
        if (!dualRoleIds.has(endpointId)) {
            return endpointId;
        }

        return roleIdOf(
            endpointId,
            topicIds.has(otherId) ? "kafka" : "requests"
        );
    }, [dualRoleIds, topicIds]);

    const rewireConnection = useCallback((connection: FinanceTopologyConnection): FinanceTopologyConnection => {
        return {
            ...connection,
            from: endpointOf(connection.from, connection.to),
            to: endpointOf(connection.to, connection.from),
        };
    }, [endpointOf]);

    const nodes = useMemo(() => {
        return topology.nodes.flatMap(rolesOf);
    }, [topology.nodes, rolesOf]);

    const connections = useMemo(() => {
        return topology.connections.map(rewireConnection);
    }, [topology.connections, rewireConnection]);

    return useMemo(() => ({
        ...topology,
        nodes,
        connections,
    }), [topology, nodes, connections]);
};

export { useRoleSplit };
