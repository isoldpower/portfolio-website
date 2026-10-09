import { useCallback, useMemo } from "react";
import { STORAGE_TYPES } from "./node-types.ts";

import type {
    FinanceInfraLaneSlotId,
    FinanceInfraLaneLayout,
    FinanceTopologyGroup,
    FinanceTopologyNode
} from "@entities/integration/model";


interface UseCoreLanesParams {
    groups: FinanceTopologyGroup[];
    nodes: FinanceTopologyNode[];
    kafkaLinkedIds: ReadonlySet<string>;
}

const useCoreLanes = ({ groups, nodes, kafkaLinkedIds }: UseCoreLanesParams): FinanceInfraLaneLayout[] => {
    const slotOf = useCallback((node: FinanceTopologyNode): FinanceInfraLaneSlotId => {
        if (node.type === "external") {
            return "external";
        } else if (kafkaLinkedIds.has(node.id)) {
            return "messaging";
        }

        return STORAGE_TYPES.has(node.type)
            ? "storages"
            : "services";
    }, [kafkaLinkedIds]);

    const groupNodes = useCallback(() => {
        const grouped = new Map<string, FinanceTopologyNode[]>();

        for (const node of nodes) {
            const nodesOfGroup = grouped.get(node.groupId) ?? [];

            nodesOfGroup.push(node);
            grouped.set(node.groupId, nodesOfGroup);
        }

        return grouped;
    }, [nodes]);

    const nodesByGroup = useMemo(() => {
        return groupNodes();
    }, [groupNodes]);

    const nodesInSlot = (
        nodesOfGroup: FinanceTopologyNode[],
        slot: FinanceInfraLaneSlotId
    ) => {
        return nodesOfGroup.filter((node) => {
            return slotOf(node) === slot;
        });
    };

    const buildLanes = useCallback(() => {
        return groups.flatMap((group): FinanceInfraLaneLayout[] => {
            const nodesOfGroup = nodesByGroup.get(group.id);

            return nodesOfGroup !== undefined ? [{
                id: group.id,
                title: group.name,
                services: nodesInSlot(nodesOfGroup, "services"),
                storages: nodesInSlot(nodesOfGroup, "storages"),
                messaging: nodesInSlot(nodesOfGroup, "messaging"),
                external: nodesInSlot(nodesOfGroup, "external"),
            }] : [];
        });
    }, [groups, nodesByGroup, slotOf]);

    return useMemo(() => {
        return buildLanes();
    }, [buildLanes]);
};

export { useCoreLanes };
export type { UseCoreLanesParams };
