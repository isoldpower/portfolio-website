import { FinanceInfraCanvasTraceDrawer } from "@entities/integration/finance-infra";

import type { TraceDrawerRenderer } from "./types.ts";


const TraceDrawerBar: TraceDrawerRenderer = ({ isHidden, onReveal }) => {
    return (
        <FinanceInfraCanvasTraceDrawer isHidden={isHidden} onReveal={onReveal}>
            <FinanceInfraCanvasTraceDrawer.Dot />
            <FinanceInfraCanvasTraceDrawer.Headline />
            <FinanceInfraCanvasTraceDrawer.Hint>Show request flow</FinanceInfraCanvasTraceDrawer.Hint>
            <FinanceInfraCanvasTraceDrawer.Arrow />
        </FinanceInfraCanvasTraceDrawer>
    );
};


export { TraceDrawerBar };
