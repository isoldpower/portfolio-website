import { FinanceInfraCanvasTraceStatus } from "@entities/integrations/finance-infra";

import type { FC } from "react";


const TraceStatusLine: FC = () => {
    return (
        <FinanceInfraCanvasTraceStatus>
            <FinanceInfraCanvasTraceStatus.Dot />
            <FinanceInfraCanvasTraceStatus.Body>
                <FinanceInfraCanvasTraceStatus.Headline>
                    <FinanceInfraCanvasTraceStatus.Counts />
                </FinanceInfraCanvasTraceStatus.Headline>
                <FinanceInfraCanvasTraceStatus.Narrative />
            </FinanceInfraCanvasTraceStatus.Body>
        </FinanceInfraCanvasTraceStatus>
    );
};


export { TraceStatusLine };
