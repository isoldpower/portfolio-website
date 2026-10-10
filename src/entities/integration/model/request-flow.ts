type FinanceTraceKind = "mutation" | "query";

type FinanceTraceStatus = "idle" | "connecting" | "waiting" | "tracing" | "viewing" | "error";

interface FinanceRequestHop {
    from: string;
    to: string;
}

interface FinanceTraceSummary {
    traceId: string;
    kind: FinanceTraceKind;
    label: string;
    startedAtMs: number;
    spanCount: number;
    hasError: boolean;
}

interface FinanceRequestFlow {
    status: FinanceTraceStatus;
    traceId: string | null;
    hops: FinanceRequestHop[];
    nodeIds: ReadonlySet<string>;
    spanCount: number;
    narrative: string | null;
    traceGroups: Record<FinanceTraceKind, FinanceTraceSummary[]>;
    isFollowingLatest: boolean;
    selectTrace: (traceId: string | null) => void;
}

interface FinanceInfraEdgePulse {
    order: number;
    total: number;
}

export type {
    FinanceTraceKind,
    FinanceTraceStatus,
    FinanceRequestHop,
    FinanceTraceSummary,
    FinanceRequestFlow,
    FinanceInfraEdgePulse
};
