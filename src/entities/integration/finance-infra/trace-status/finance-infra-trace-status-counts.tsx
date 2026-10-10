import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FC } from "react";


const FinanceInfraTraceStatusCounts: FC = () => {
    const { flow } = useFinanceInfraCanvas();

    if (flow.status !== "tracing" && flow.status !== "viewing") {
        return null;
    }

    return (
        <span className="text-muted">
            {` · ${String(flow.spanCount)} spans · ${String(flow.hops.length)} hops`}
        </span>
    );
};

FinanceInfraTraceStatusCounts.displayName = "FinanceInfraTraceStatusCounts";

export { FinanceInfraTraceStatusCounts };
