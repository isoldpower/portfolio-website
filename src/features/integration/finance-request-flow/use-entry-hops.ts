import { useCallback, useMemo } from "react";

import { ENTRY_CONNECTION_KIND, ENTRY_NODE_TYPE, ENTRY_SPAN_KIND } from "./constants.ts";
import { useTopologyPaths } from "./use-topology-paths.ts";

import type { FinanceDemoSpan, FinanceRequestHop, FinanceTopology } from "@entities/integration/model";


type EntryHopsOf = (span: FinanceDemoSpan, serviceNodeId: string) => readonly FinanceRequestHop[];

const useEntryHops = (topology: FinanceTopology): EntryHopsOf => {
    const requestConnections = useMemo(() => {
        return topology.connections.filter((connection) => {
            return connection.kind === ENTRY_CONNECTION_KIND;
        });
    }, [topology.connections]);
    const requestPathBetween = useTopologyPaths(requestConnections);

    const entryNodeIds = useMemo(() => {
        return topology.nodes
            .filter((node) => {
                return node.type === ENTRY_NODE_TYPE;
            })
            .map((node) => {
                return node.id;
            });
    }, [topology.nodes]);

    return useCallback((span: FinanceDemoSpan, serviceNodeId: string): readonly FinanceRequestHop[] => {
        if (span.kind !== ENTRY_SPAN_KIND) {
            return [];
        }

        for (const entryNodeId of entryNodeIds) {
            const path = requestPathBetween(entryNodeId, serviceNodeId);

            if (path !== null) {
                return path;
            }
        }

        return [];
    }, [entryNodeIds, requestPathBetween]);
};

export { useEntryHops };
export type { EntryHopsOf };
