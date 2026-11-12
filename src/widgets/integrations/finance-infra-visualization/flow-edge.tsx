import { FinanceInfraCanvasEdge } from "@entities/integrations/finance-infra";

import type { EdgeRenderer } from "./types.ts";


const FlowEdge: EdgeRenderer = ({ connection }) => {
    return (
        <FinanceInfraCanvasEdge connection={connection}>
            <FinanceInfraCanvasEdge.Path />
            <FinanceInfraCanvasEdge.Pulse />
        </FinanceInfraCanvasEdge>
    );
};


export { FlowEdge };
