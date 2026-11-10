import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FC } from "react";


const FinanceInfraTraceStatusNarrative: FC = () => {
    const { flow } = useFinanceInfraCanvas();

    if (flow.narrative === null) {
        return null;
    }

    return (
        <span className="truncate text-muted" title={flow.narrative}>
            {flow.narrative}
        </span>
    );
};

FinanceInfraTraceStatusNarrative.displayName = "FinanceInfraTraceStatusNarrative";

export { FinanceInfraTraceStatusNarrative };
