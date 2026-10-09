import { useCallback, useMemo } from "react";
import { instanceIdOf } from "./instance-id.ts";

import type { InstanceGroups } from "./use-instance-groups.ts";
import type { FinanceTopologyConnection, FinanceTopologyNode } from "@entities/integration/model";


interface UseInstancedConnectionsParams {
    nodes: FinanceTopologyNode[];
    connections: FinanceTopologyConnection[];
    instanceGroups: InstanceGroups;
}

const useInstancedConnections = ({
    nodes,
    connections,
    instanceGroups
}: UseInstancedConnectionsParams): FinanceTopologyConnection[] => {
    const groupById = useMemo(() => {
        return new Map(nodes.map((node) => {
            return [node.id, node.groupId];
        }));
    }, [nodes]);

    const endpointsOf = useCallback((endpointId: string, otherId: string): string[] => {
        const groupIds = instanceGroups.get(endpointId);

        if (groupIds === undefined) {
            return [endpointId];
        }

        const otherGroupId = groupById.get(otherId);
        const ownGroupIds = otherGroupId !== undefined && groupIds.includes(otherGroupId)
            ? [otherGroupId]
            : groupIds;

        return ownGroupIds.map((groupId) => {
            return instanceIdOf(endpointId, groupId);
        });
    }, [instanceGroups, groupById]);

    const instancesOf = useCallback((connection: FinanceTopologyConnection): FinanceTopologyConnection[] => {
        return endpointsOf(connection.from, connection.to).flatMap((from) => {
            return endpointsOf(connection.to, connection.from).map((to) => {
                return { ...connection, from, to };
            });
        });
    }, [endpointsOf]);

    return useMemo(() => {
        return connections.flatMap(instancesOf);
    }, [connections, instancesOf]);
};

export { useInstancedConnections };
export type { UseInstancedConnectionsParams };
