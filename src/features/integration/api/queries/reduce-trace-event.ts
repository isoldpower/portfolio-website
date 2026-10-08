import { mapFinanceSpan } from "../mappers.ts";

import type { FinanceTraceEventDto } from "../types.ts";
import type { FinanceTraceStreamSnapshot } from "./types.ts";


const INITIAL_TRACE_STREAM: FinanceTraceStreamSnapshot = {
    isOpen: false,
    serviceHits: new Map(),
};

function reduceTraceEvent(
    snapshot: FinanceTraceStreamSnapshot,
    event: FinanceTraceEventDto
): FinanceTraceStreamSnapshot {
    if (event.type === "open") {
        return snapshot.isOpen ? snapshot : { ...snapshot, isOpen: true };
    }

    const span = mapFinanceSpan(event.span);
    const previousHit = snapshot.serviceHits.get(span.service);
    const serviceHits = new Map(snapshot.serviceHits);

    serviceHits.set(span.service, {
        service: span.service,
        hitCount: (previousHit?.hitCount ?? 0) + 1,
        lastSpan: span,
    });

    return { ...snapshot, serviceHits };
}

export { INITIAL_TRACE_STREAM, reduceTraceEvent };
