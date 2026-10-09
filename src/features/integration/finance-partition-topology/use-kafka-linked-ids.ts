import { useCallback, useMemo } from "react";

import type { FinanceTopologyConnection, FinanceTopologyNode } from "@entities/integration/model";


interface UseKafkaLinkedIdsParams {
    connections: FinanceTopologyConnection[];
    streaming: FinanceTopologyNode[];
}

const useKafkaLinkedIds = ({ connections, streaming }: UseKafkaLinkedIdsParams): ReadonlySet<string> => {
    const streamingIds = useMemo(() => {
        return new Set(streaming.map((node) => {
            return node.id;
        }));
    }, [streaming]);

    const collectLinkedIds = useCallback(() => {
        return new Set(connections.flatMap((connection) => {
            const fromStreaming = streamingIds.has(connection.from);
            const toStreaming = streamingIds.has(connection.to);

            if (fromStreaming === toStreaming) {
                return [];
            }

            return fromStreaming ? [connection.to] : [connection.from];
        }));
    }, [connections, streamingIds]);

    return useMemo(() => {
        return collectLinkedIds();
    }, [collectLinkedIds]);
};

export { useKafkaLinkedIds };
export type { UseKafkaLinkedIdsParams };
