import { useCallback, useMemo } from "react";
import { MAIN_TOPIC_NAME } from "./node-types.ts";

import type { FinanceTopologyConnection, FinanceTopologyNode } from "@entities/integration/model";


interface UseMainTopicRolesParams {
    nodes: FinanceTopologyNode[];
    connections: FinanceTopologyConnection[];
}

interface UseMainTopicRolesReturn {
    publisherIds: ReadonlySet<string>;
    consumerIds: ReadonlySet<string>;
}

const useMainTopicRoles = ({ nodes, connections }: UseMainTopicRolesParams): UseMainTopicRolesReturn => {
    const mainTopicIds = useMemo(() => {
        return new Set(nodes
            .filter((node) => {
                return node.type === "topic" && node.name === MAIN_TOPIC_NAME;
            })
            .map((node) => {
                return node.id;
            }));
    }, [nodes]);

    const collectRoles = useCallback(() => {
        const publisherIds = new Set(connections
            .filter((connection) => {
                return mainTopicIds.has(connection.to);
            })
            .map((connection) => {
                return connection.from;
            }));
        const consumerIds = new Set(connections
            .filter((connection) => {
                return mainTopicIds.has(connection.from);
            })
            .map((connection) => {
                return connection.to;
            }));

        return { publisherIds, consumerIds };
    }, [connections, mainTopicIds]);

    return useMemo(() => {
        return collectRoles();
    }, [collectRoles]);
};

export { useMainTopicRoles };
export type { UseMainTopicRolesParams, UseMainTopicRolesReturn };
