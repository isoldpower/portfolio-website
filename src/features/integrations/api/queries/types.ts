import type { FinanceTraceRecords } from "../traces";


interface FinanceTraceStreamSnapshot {
    isOpen: boolean;
    traces: FinanceTraceRecords;
}

export type { FinanceTraceStreamSnapshot };
