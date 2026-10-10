import type { FinanceDemoSpan, FinanceTraceKind } from "@entities/integration/model";


interface FinanceTraceRecord {
    traceId: string;
    spans: readonly FinanceDemoSpan[];
    kind: FinanceTraceKind | null;
    label: string;
    startedAtNanos: bigint;
    isFailed: boolean;
    hasFailedSpan: boolean;
}

type FinanceTraceRecords = ReadonlyMap<string, FinanceTraceRecord>;

export type { FinanceTraceRecord, FinanceTraceRecords };
