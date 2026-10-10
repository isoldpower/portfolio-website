import type { FinanceTraceStatus } from "@entities/integration/model";


const TRACE_STATUS_DOT_CLASSES: Record<FinanceTraceStatus, string> = {
    idle: "bg-subtle",
    connecting: "bg-amber-500 animate-pulse",
    waiting: "bg-positive animate-pulse",
    tracing: "bg-accent",
    viewing: "bg-subtle",
    error: "bg-negative",
};

function resolveTraceStatusDotClass(status: FinanceTraceStatus): string {
    return TRACE_STATUS_DOT_CLASSES[status];
}

export { resolveTraceStatusDotClass };
