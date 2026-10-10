import { useCallback, useMemo, useState } from "react";

import type { FinanceTraceSummary } from "@entities/integration/model";


interface UseTraceSelectionReturn {
    traceId: string | null;
    isFollowingLatest: boolean;
    selectTrace: (traceId: string | null) => void;
}

const useTraceSelection = (traces: FinanceTraceSummary[]): UseTraceSelectionReturn => {
    const [pinnedTraceId, setPinnedTraceId] = useState<string | null>(null);
    const latestTraceId = traces[0]?.traceId ?? null;
    const isFollowingLatest = pinnedTraceId === null || !traces.some((trace) => {
        return trace.traceId === pinnedTraceId;
    });

    const selectTrace = useCallback((traceId: string | null) => {
        setPinnedTraceId(traceId);
    }, []);

    return useMemo(() => ({
        traceId: isFollowingLatest ? latestTraceId : pinnedTraceId,
        isFollowingLatest,
        selectTrace,
    }), [isFollowingLatest, latestTraceId, pinnedTraceId, selectTrace]);
};

export { useTraceSelection };
export type { UseTraceSelectionReturn };
