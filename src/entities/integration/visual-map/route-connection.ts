import { portOf, portPath, sideFacing, sidesBetween } from "./connection-path.ts";

import type { FinanceInfraAnchor, FinanceTopicPortSide, FinanceTopologyConnection } from "@entities/integration/model";


type AnchorLookup = ReadonlyMap<string, FinanceInfraAnchor>;
type TopicInflowLookup = ReadonlyMap<string, FinanceTopicPortSide>;

function oppositeOf(side: FinanceTopicPortSide): FinanceTopicPortSide {
    return side === "top" ? "bottom" : "top";
}

function routeConnection(
    connection: FinanceTopologyConnection,
    anchors: AnchorLookup,
    topicInflows: TopicInflowLookup
): string | null {
    const [connectionFrom, connectionTo] = [anchors.get(connection.from), anchors.get(connection.to)];
    if (connectionFrom === undefined || connectionTo === undefined) {
        return null;
    }

    const fromInflow = topicInflows.get(connection.from);
    const toInflow = topicInflows.get(connection.to);
    const fromTopicPort = fromInflow === undefined
        ? null
        : portOf(connectionFrom, oppositeOf(fromInflow));
    const toTopicPort = toInflow === undefined
        ? null
        : portOf(connectionTo, toInflow);

    if (fromTopicPort !== null && toTopicPort !== null) {
        return portPath(fromTopicPort, toTopicPort);
    } else if (toTopicPort !== null) {
        return portPath(
            portOf(connectionFrom, sideFacing(connectionFrom, toTopicPort)),
            toTopicPort
        );
    } else if (fromTopicPort !== null) {
        return portPath(
            fromTopicPort,
            portOf(connectionTo, sideFacing(connectionTo, fromTopicPort))
        );
    }

    const [fromSide, toSide] = sidesBetween(connectionFrom, connectionTo);
    return portPath(portOf(connectionFrom, fromSide), portOf(connectionTo, toSide));
}

export { routeConnection };
export type { AnchorLookup, TopicInflowLookup };
