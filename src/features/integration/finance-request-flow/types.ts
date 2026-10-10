import type { FinanceDemoSpan } from "@entities/integration/model";


interface ResolvedSpan {
    span: FinanceDemoSpan;
    serviceNodeId: string;
    startNodeId: string;
    endNodeId: string;
}

export type { ResolvedSpan };
