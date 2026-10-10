import { useMemo } from "react";

import { hopKeyOf } from "./hop-key.ts";
import { useSpanHops } from "./use-span-hops.ts";
import { useSpanResolver } from "./use-span-resolver.ts";

import type { ResolvedSpan } from "./types.ts";
import type { FinanceDemoSpan, FinanceRequestHop, FinanceTopology } from "@entities/integration/model";


interface TraceHops {
    hops: FinanceRequestHop[];
    nodeIds: ReadonlySet<string>;
}

const compareStart = (left: ResolvedSpan, right: ResolvedSpan): number => {
    const leftStart = left.span.startTimeUnixNano;
    const rightStart = right.span.startTimeUnixNano;

    if (leftStart === rightStart) {
        return 0;
    }

    return leftStart < rightStart ? -1 : 1;
};

const useTraceHops = (topology: FinanceTopology, spans: readonly FinanceDemoSpan[]): TraceHops => {
    const resolveSpan = useSpanResolver(topology);
    const spanHopsOf = useSpanHops(topology);

    const resolvedById = useMemo(() => {
        return new Map(spans.flatMap((span) => {
            const resolved = resolveSpan(span);

            return resolved === null ? [] : [[span.spanId, resolved] as const];
        }));
    }, [spans, resolveSpan]);

    return useMemo(() => {
        const hopsByKey = new Map<string, FinanceRequestHop>();
        const nodeIds = new Set<string>();

        for (const resolved of [...resolvedById.values()].sort(compareStart)) {
            const parentSpanId = resolved.span.parentSpanId;
            const parent = parentSpanId === null
                ? undefined
                : resolvedById.get(parentSpanId);

            nodeIds.add(resolved.serviceNodeId);

            for (const hop of spanHopsOf(resolved, parent)) {
                const hopKey = hopKeyOf(hop.from, hop.to);

                if (!hopsByKey.has(hopKey)) {
                    hopsByKey.set(hopKey, hop);
                    nodeIds.add(hop.from).add(hop.to);
                }
            }
        }

        return { hops: [...hopsByKey.values()], nodeIds };
    }, [resolvedById, spanHopsOf]);
};

export { useTraceHops };
export type { TraceHops };
