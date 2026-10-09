import { useCallback, useMemo } from "react";
import { INSTANCED_TYPES } from "./instanced-types.ts";

import type { FinanceTopologyConnection, FinanceTopologyNode } from "@entities/integration/model";


type InstanceGroups = ReadonlyMap<string, string[]>;

interface UseInstanceGroupsParams {
    nodes: FinanceTopologyNode[];
    connections: FinanceTopologyConnection[];
}

const useInstanceGroups = ({ nodes, connections }: UseInstanceGroupsParams): InstanceGroups => {
    const nodesById = useMemo(() => {
        return new Map(nodes.map((node) => {
            return [node.id, node];
        }));
    }, [nodes]);

    const groupOfNeighbour = useCallback((neighbourId: string) => {
        const neighbour = nodesById.get(neighbourId);

        if (neighbour === undefined || neighbour.type === "topic" || INSTANCED_TYPES.has(neighbour.type)) {
            return undefined;
        }

        return neighbour.groupId;
    }, [nodesById]);

    const collectGroups = useCallback(() => {
        const groups = new Map<string, Set<string>>();

        for (const connection of connections) {
            for (const [instancedId, neighbourId] of [[connection.to, connection.from], [connection.from, connection.to]]) {
                const instanced = nodesById.get(instancedId);
                const groupId = groupOfNeighbour(neighbourId);

                if (instanced !== undefined && INSTANCED_TYPES.has(instanced.type) && groupId !== undefined) {
                    groups.set(instancedId, (groups.get(instancedId) ?? new Set()).add(groupId));
                }
            }
        }

        return new Map([...groups].map(([instancedId, groupIds]) => {
            return [instancedId, [...groupIds]];
        }));
    }, [connections, nodesById, groupOfNeighbour]);

    return useMemo(() => {
        return collectGroups();
    }, [collectGroups]);
};

export { useInstanceGroups };
export type { InstanceGroups, UseInstanceGroupsParams };
