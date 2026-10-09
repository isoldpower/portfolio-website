import { useCallback, useMemo } from "react";
import { routeConnection } from "@entities/integration/visual-map";
import { useTopicInflows } from "./use-topic-inflows.ts";

import type {
    FinanceInfraChannelPlacements,
    FinanceInfraRoutedConnection,
    FinanceTopicChannel,
    FinanceTopologyConnection
} from "@entities/integration/model";
import type { AnchorLookup } from "@entities/integration/visual-map";


interface UseConnectionRoutingParams {
    connections: FinanceTopologyConnection[];
    channels: FinanceTopicChannel[];
    anchors: AnchorLookup;
    placements: FinanceInfraChannelPlacements;
}

const useConnectionRouting = ({
    connections,
    channels,
    anchors,
    placements
}: UseConnectionRoutingParams): FinanceInfraRoutedConnection[] => {
    const topicInflows = useTopicInflows({ channels, placements });

    const routeConnections = useCallback(() => {
        const routed: FinanceInfraRoutedConnection[] = [];

        for (const connection of connections) {
            const path = routeConnection(connection, anchors, topicInflows);

            if (path !== null) {
                routed.push({ key: `${connection.from}->${connection.to}:${connection.kind}`, connection, path });
            }
        }

        return routed;
    }, [connections, anchors, topicInflows]);

    return useMemo(() => routeConnections(), [routeConnections]);
};

export { useConnectionRouting };
export type { UseConnectionRoutingParams };
