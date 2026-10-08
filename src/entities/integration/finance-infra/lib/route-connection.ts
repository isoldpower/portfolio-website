import { portOf, portPath, sideFacing, sidesBetween } from "./connection-path.ts";

import type { FinanceInfraAnchor, FinanceTopicPortSide } from "../model/types.ts";
import type { FinanceTopologyConnection } from "@entities/integration/model";


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
    const from = anchors.get(connection.from);
    const to = anchors.get(connection.to);

    if (from === undefined || to === undefined) {
        return null;
    }

    const fromInflow = topicInflows.get(connection.from);
    const toInflow = topicInflows.get(connection.to);
    const fromTopicPort = fromInflow === undefined ? null : portOf(from, oppositeOf(fromInflow));
    const toTopicPort = toInflow === undefined ? null : portOf(to, toInflow);

    if (fromTopicPort !== null && toTopicPort !== null) {
        return portPath(fromTopicPort, toTopicPort);
    }

    if (toTopicPort !== null) {
        return portPath(portOf(from, sideFacing(from, toTopicPort)), toTopicPort);
    }

    if (fromTopicPort !== null) {
        return portPath(fromTopicPort, portOf(to, sideFacing(to, fromTopicPort)));
    }

    const [fromSide, toSide] = sidesBetween(from, to);

    return portPath(portOf(from, fromSide), portOf(to, toSide));
}

export { routeConnection };
export type { AnchorLookup, TopicInflowLookup };
