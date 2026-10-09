import { useCallback, useMemo } from "react";

import type { UseMainTopicRolesReturn } from "./use-main-topic-roles.ts";
import type { FinanceInfraLaneLayout, FinanceTopologyNode } from "@entities/integration/model";


interface UseMainTopicOrderParams {
    lanes: FinanceInfraLaneLayout[];
    roles: UseMainTopicRolesReturn;
}

const useMainTopicOrder = ({ lanes, roles }: UseMainTopicOrderParams): FinanceInfraLaneLayout[] => {
    const rankOfNode = useCallback((node: FinanceTopologyNode) => {
        if (roles.publisherIds.has(node.id)) {
            return 0;
        }

        return roles.consumerIds.has(node.id) ? 2 : 1;
    }, [roles]);

    const sortNodes = useCallback((nodes: FinanceTopologyNode[]) => {
        return [...nodes].sort((left, right) => {
            return rankOfNode(left) - rankOfNode(right);
        });
    }, [rankOfNode]);

    const rankOfLane = useCallback((lane: FinanceInfraLaneLayout) => {
        const hasPublisher = [...lane.services, ...lane.storages, ...lane.messaging].some((node) => {
            return roles.publisherIds.has(node.id);
        });

        return hasPublisher ? 0 : 1;
    }, [roles]);

    const orderLanes = useCallback(() => {
        return lanes
            .map((lane) => {
                return {
                    ...lane,
                    services: sortNodes(lane.services),
                    storages: sortNodes(lane.storages),
                    messaging: sortNodes(lane.messaging),
                };
            })
            .sort((left, right) => {
                return rankOfLane(left) - rankOfLane(right);
            });
    }, [lanes, sortNodes, rankOfLane]);

    return useMemo(() => {
        return orderLanes();
    }, [orderLanes]);
};

export { useMainTopicOrder };
export type { UseMainTopicOrderParams };
