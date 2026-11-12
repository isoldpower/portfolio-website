import type { FinanceDemoSpan } from "@entities/integrations/model";


interface ResolvedSpan {
    span: FinanceDemoSpan;
    serviceNodeId: string;
    startNodeId: string;
    endNodeId: string;
}

export type { ResolvedSpan };
