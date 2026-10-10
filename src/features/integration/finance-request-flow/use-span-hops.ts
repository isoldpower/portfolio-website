import { useCallback } from "react";

import { useEntryHops } from "./use-entry-hops.ts";
import { useTopologyPaths } from "./use-topology-paths.ts";

import type { ResolvedSpan } from "./types.ts";
import type { FinanceRequestHop, FinanceTopology } from "@entities/integration/model";


type SpanHopsOf = (resolved: ResolvedSpan, parent: ResolvedSpan | undefined) => readonly FinanceRequestHop[];

const NO_HOPS: readonly FinanceRequestHop[] = [];

const useSpanHops = (topology: FinanceTopology): SpanHopsOf => {
    const pathBetween = useTopologyPaths(topology.connections);
    const entryHopsOf = useEntryHops(topology);

    const inboundHopsOf = useCallback((resolved: ResolvedSpan, parent: ResolvedSpan): readonly FinanceRequestHop[] => {
        if (parent.endNodeId === resolved.startNodeId) {
            return NO_HOPS;
        }

        return pathBetween(parent.endNodeId, resolved.startNodeId)
            ?? pathBetween(parent.serviceNodeId, resolved.startNodeId)
            ?? NO_HOPS;
    }, [pathBetween]);

    return useCallback((resolved: ResolvedSpan, parent: ResolvedSpan | undefined): readonly FinanceRequestHop[] => {
        const inboundHops = parent === undefined
            ? entryHopsOf(resolved.span, resolved.startNodeId)
            : inboundHopsOf(resolved, parent);
        const ownHops = pathBetween(resolved.startNodeId, resolved.endNodeId) ?? NO_HOPS;

        return [...inboundHops, ...ownHops];
    }, [entryHopsOf, inboundHopsOf, pathBetween]);
};

export { useSpanHops };
export type { SpanHopsOf };
