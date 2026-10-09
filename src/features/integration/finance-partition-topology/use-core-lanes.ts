import { useCallback, useMemo } from "react";
import { STORAGE_TYPES } from "./node-types.ts";

import type {
    FinanceInfraLaneLayout,
    FinanceTopologyGroup,
    FinanceTopologyNode
} from "@entities/integration/model";


interface UseCoreLanesParams {
    groups: FinanceTopologyGroup[];
    nodes: FinanceTopologyNode[];
}

const useCoreLanes = ({ groups, nodes }: UseCoreLanesParams): FinanceInfraLaneLayout[] => {
    const groupNodes = useCallback(() => {
        const grouped = new Map<string, FinanceTopologyNode[]>();

        for (const node of nodes) {
            const nodesOfGroup = grouped.get(node.groupId) ?? [];

            nodesOfGroup.push(node);
            grouped.set(node.groupId, nodesOfGroup);
        }

        return grouped;
    }, [nodes]);
    const nodesByGroup = useMemo(() => groupNodes(), [groupNodes]);

    const buildLanes = useCallback(() => {
        const laneLayouts: FinanceInfraLaneLayout[] = [];

        for (const group of groups) {
            const nodesOfGroup = nodesByGroup.get(group.id);

            if (nodesOfGroup !== undefined) {
                laneLayouts.push({
                    id: group.id,
                    title: group.name,
                    primary: nodesOfGroup.filter((node) => {
                        return !STORAGE_TYPES.has(node.type);
                    }),
                    secondary: nodesOfGroup.filter((node) => {
                        return STORAGE_TYPES.has(node.type);
                    }),
                });
            }
        }

        return laneLayouts;
    }, [groups, nodesByGroup]);

    return useMemo(() => buildLanes(), [buildLanes]);
};

export { useCoreLanes };
export type { UseCoreLanesParams };
