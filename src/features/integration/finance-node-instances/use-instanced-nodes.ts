import { useCallback, useMemo } from "react";
import { instanceIdOf } from "./instance-id.ts";

import type { InstanceGroups } from "./use-instance-groups.ts";
import type { FinanceTopologyNode } from "@entities/integration/model";


interface UseInstancedNodesParams {
    nodes: FinanceTopologyNode[];
    instanceGroups: InstanceGroups;
}

const useInstancedNodes = ({ nodes, instanceGroups }: UseInstancedNodesParams): FinanceTopologyNode[] => {
    const instancesOf = useCallback((node: FinanceTopologyNode): FinanceTopologyNode[] => {
        const groupIds = instanceGroups.get(node.id);

        if (groupIds === undefined) {
            return [node];
        }

        return groupIds.map((groupId) => {
            return { ...node, id: instanceIdOf(node.id, groupId), groupId };
        });
    }, [instanceGroups]);

    return useMemo(() => {
        return nodes.flatMap(instancesOf);
    }, [nodes, instancesOf]);
};

export { useInstancedNodes };
export type { UseInstancedNodesParams };
