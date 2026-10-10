import { traceKindOf } from "./trace-kind.ts";
import { traceLabelOf } from "./trace-label.ts";
import { hasFailedSpan, isTraceFailed } from "./trace-outcome.ts";

import type { FinanceDemoSpan } from "@entities/integration/model";
import type { FinanceTraceRecord } from "./types.ts";


function appendTraceSpan(record: FinanceTraceRecord | undefined, span: FinanceDemoSpan): FinanceTraceRecord {
    const spans = [...(record?.spans ?? []), span];
    const startedAtNanos = record === undefined || span.startTimeUnixNano < record.startedAtNanos
        ? span.startTimeUnixNano
        : record.startedAtNanos;

    return {
        traceId: span.traceId,
        spans,
        kind: traceKindOf(spans),
        label: traceLabelOf(spans),
        startedAtNanos,
        isFailed: isTraceFailed(spans),
        hasFailedSpan: hasFailedSpan(spans),
    };
}

export { appendTraceSpan };
