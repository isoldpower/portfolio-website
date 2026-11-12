import { mapFinanceSpan } from "../mappers.ts";
import { appendTraceSpan, retainTraceRecords } from "../traces";

import type { FinanceTraceEventDto } from "../types.ts";
import type { FinanceTraceStreamSnapshot } from "./types.ts";


const INITIAL_TRACE_STREAM: FinanceTraceStreamSnapshot = {
    isOpen: false,
    traces: new Map(),
};

function reduceTraceEvent(
    snapshot: FinanceTraceStreamSnapshot,
    event: FinanceTraceEventDto
): FinanceTraceStreamSnapshot {
    if (event.type === "open") {
        return snapshot.isOpen
            ? snapshot
            : { ...snapshot, isOpen: true };
    }

    const span = mapFinanceSpan(event.span);
    const traces = new Map(snapshot.traces);
    const record = appendTraceSpan(traces.get(span.traceId), span);

    traces.delete(span.traceId);
    traces.set(span.traceId, record);
    retainTraceRecords(traces);

    return { ...snapshot, traces };
}

export { INITIAL_TRACE_STREAM, reduceTraceEvent };
