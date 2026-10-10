import { useCallback, useMemo } from "react";

import { NANOS_PER_MILLI } from "./constants.ts";

import type { FinanceTraceRecord, FinanceTraceRecords } from "../api";
import type { FinanceTraceKind, FinanceTraceSummary } from "@entities/integration/model";


type TraceGroups = Record<FinanceTraceKind, FinanceTraceSummary[]>;

interface UseTraceSummariesReturn {
    traces: FinanceTraceSummary[];
    traceGroups: TraceGroups;
}

const useTraceSummaries = (records: FinanceTraceRecords | undefined): UseTraceSummariesReturn => {
    const summaryOf = useCallback((
        record: FinanceTraceRecord
    ): FinanceTraceSummary[] => {
        if (record.kind === null || record.isFailed) {
            return [];
        }

        return [{
            traceId: record.traceId,
            kind: record.kind,
            label: record.label,
            startedAtMs: Number(record.startedAtNanos / NANOS_PER_MILLI),
            spanCount: record.spans.length,
            hasError: record.hasFailedSpan,
        }];
    }, []);

    const compareNewestFirst = useCallback((
        left: FinanceTraceRecord,
        right: FinanceTraceRecord
    ): number => {
        if (left.startedAtNanos === right.startedAtNanos) {
            return 0;
        }

        return left.startedAtNanos > right.startedAtNanos ? -1 : 1;
    }, []);

    const ofKind = useCallback((
        summaries: FinanceTraceSummary[],
        kind: FinanceTraceKind
    ): FinanceTraceSummary[] => {
        return summaries.filter((summary) => {
            return summary.kind === kind;
        });
    }, []);

    return useMemo(() => {
        const summaries = [...(records?.values() ?? [])]
            .sort(compareNewestFirst)
            .flatMap(summaryOf);

        return {
            traces: summaries,
            traceGroups: {
                mutation: ofKind(summaries, "mutation"),
                query: ofKind(summaries, "query"),
            },
        };
    }, [records, compareNewestFirst, summaryOf, ofKind]);
};

export { useTraceSummaries };
export type { TraceGroups, UseTraceSummariesReturn };
