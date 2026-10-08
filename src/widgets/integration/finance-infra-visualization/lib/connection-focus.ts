import type { FinanceInfraEmphasis } from "@entities/integration/finance-infra";
import type { FinanceTopologyConnection } from "@entities/integration/model";


interface ConnectionFocus {
    nodeId: string;
    neighbourIds: ReadonlySet<string>;
}

function focusOf(connections: FinanceTopologyConnection[], nodeId: string | null): ConnectionFocus | null {
    if (nodeId === null) {
        return null;
    }

    const neighbourIds = new Set<string>();

    for (const connection of connections) {
        if (connection.from === nodeId) {
            neighbourIds.add(connection.to);
        }

        if (connection.to === nodeId) {
            neighbourIds.add(connection.from);
        }
    }

    return { nodeId, neighbourIds };
}

function nodeEmphasisOf(focus: ConnectionFocus | null, nodeId: string): FinanceInfraEmphasis {
    if (focus === null) {
        return "default";
    }

    return focus.nodeId === nodeId || focus.neighbourIds.has(nodeId) ? "active" : "muted";
}

function connectionEmphasisOf(focus: ConnectionFocus | null, connection: FinanceTopologyConnection): FinanceInfraEmphasis {
    if (focus === null) {
        return "default";
    }

    return connection.from === focus.nodeId || connection.to === focus.nodeId ? "active" : "muted";
}

export { focusOf, nodeEmphasisOf, connectionEmphasisOf };
export type { ConnectionFocus };
