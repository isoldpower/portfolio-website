import { useCallback, useMemo } from "react";

import type { FinanceTopologyConnection, FinanceTopologyNode } from "@entities/integration/model";


interface UseDualRoleIdsParams {
    nodes: FinanceTopologyNode[];
    connections: FinanceTopologyConnection[];
    topicIds: ReadonlySet<string>;
}

const useDualRoleIds = ({ nodes, connections, topicIds }: UseDualRoleIdsParams): ReadonlySet<string> => {
    const collectDualRoleIds = useCallback(() => {
        const requestHandlerIds = new Set(connections
            .filter((connection) => {
                return connection.kind === "request";
            })
            .map((connection) => {
                return connection.to;
            }));
        const kafkaLinkedIds = new Set(connections.flatMap((connection) => {
            if (topicIds.has(connection.to)) {
                return [connection.from];
            }

            return topicIds.has(connection.from) ? [connection.to] : [];
        }));

        return new Set(nodes
            .filter((node) => {
                return requestHandlerIds.has(node.id) && kafkaLinkedIds.has(node.id);
            })
            .map((node) => {
                return node.id;
            }));
    }, [nodes, connections, topicIds]);

    return useMemo(() => {
        return collectDualRoleIds();
    }, [collectDualRoleIds]);
};

export { useDualRoleIds };
export type { UseDualRoleIdsParams };
