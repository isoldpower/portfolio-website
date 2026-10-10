import { useMemo } from "react";

import { useFinanceProjectStream } from "../finance-tracing";
import { useDemoContext } from "../web-demo-context";
import { useTraceHops } from "./use-trace-hops.ts";
import { useTraceSelection } from "./use-trace-selection.ts";
import { useTraceSummaries } from "./use-trace-summaries.ts";

import type { FinanceDemoSpan, FinanceRequestFlow, FinanceTopology, FinanceTraceStatus } from "@entities/integration/model";


const NO_SPANS: readonly FinanceDemoSpan[] = [];

const useRequestFlow = (topology: FinanceTopology): FinanceRequestFlow => {
    const { demoSession } = useDemoContext();
    const { data: stream, isError } = useFinanceProjectStream(demoSession);
    const { traces, traceGroups } = useTraceSummaries(stream?.traces);
    const { traceId, isFollowingLatest, selectTrace } = useTraceSelection(traces);

    const spans = useMemo(() => {
        return traceId === null ? NO_SPANS : stream?.traces.get(traceId)?.spans ?? NO_SPANS;
    }, [stream, traceId]);

    const { hops, nodeIds } = useTraceHops(topology, spans);

    const status = useMemo<FinanceTraceStatus>(() => {
        if (demoSession === null) {
            return "idle";
        }

        if (isError) {
            return "error";
        }

        if (stream?.isOpen !== true) {
            return "connecting";
        }

        if (spans.length === 0) {
            return "waiting";
        }

        return isFollowingLatest ? "tracing" : "viewing";
    }, [demoSession, isError, stream?.isOpen, spans.length, isFollowingLatest]);

    return useMemo(() => ({
        status,
        traceId,
        hops,
        nodeIds,
        spanCount: spans.length,
        narrative: spans.at(-1)?.narrative ?? null,
        traceGroups,
        isFollowingLatest,
        selectTrace,
    }), [status, traceId, hops, nodeIds, spans, traceGroups, isFollowingLatest, selectTrace]);
};

export { useRequestFlow };
