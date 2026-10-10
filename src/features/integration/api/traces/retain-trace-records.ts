import type { FinanceTraceKind } from "@entities/integration/model";
import type { FinanceTraceRecord } from "./types.ts";


type TraceBucket = FinanceTraceKind | "pending" | "failed";

const RETAINED_TRACES_PER_BUCKET: Record<TraceBucket, number> = {
    mutation: 5,
    query: 5,
    pending: 16,
    failed: 16,
};

const NEWEST_FIRST_BUCKETS: ReadonlySet<TraceBucket> = new Set<TraceBucket>(["mutation", "query"]);

function bucketOf(record: FinanceTraceRecord): TraceBucket {
    if (record.isFailed) {
        return "failed";
    }

    return record.kind ?? "pending";
}

function compareNewestFirst(left: FinanceTraceRecord, right: FinanceTraceRecord): number {
    if (left.startedAtNanos === right.startedAtNanos) {
        return 0;
    }

    return left.startedAtNanos > right.startedAtNanos ? -1 : 1;
}

function evictedFrom(bucket: TraceBucket, records: FinanceTraceRecord[]): FinanceTraceRecord[] {
    const limit = RETAINED_TRACES_PER_BUCKET[bucket];

    if (NEWEST_FIRST_BUCKETS.has(bucket)) {
        return [...records].sort(compareNewestFirst).slice(limit);
    }

    return records.slice(
        0,
        Math.max(records.length - limit, 0)
    );
}

function retainTraceRecords(records: Map<string, FinanceTraceRecord>): void {
    const recordsByBucket = new Map<TraceBucket, FinanceTraceRecord[]>();

    for (const record of records.values()) {
        const bucket = bucketOf(record);

        recordsByBucket.set(
            bucket,
            [...(recordsByBucket.get(bucket) ?? []), record]
        );
    }

    for (const [bucket, bucketRecords] of recordsByBucket) {
        for (const record of evictedFrom(bucket, bucketRecords)) {
            records.delete(record.traceId);
        }
    }
}

export { retainTraceRecords };
