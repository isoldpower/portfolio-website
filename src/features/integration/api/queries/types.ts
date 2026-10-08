import type { FinanceDemoSpan } from "@entities/integration/model";


interface FinanceServiceHit {
    service: string;
    hitCount: number;
    lastSpan: FinanceDemoSpan;
}

interface FinanceTraceStreamSnapshot {
    isOpen: boolean;
    serviceHits: ReadonlyMap<string, FinanceServiceHit>;
}

export type { FinanceServiceHit, FinanceTraceStreamSnapshot };
