import { Text } from "@shared/ui-toolkit/typography";

import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FC } from "react";


const FinanceInfraTraceStatusCounts: FC = () => {
    const { flow } = useFinanceInfraCanvas();

    if (flow.status !== "tracing" && flow.status !== "viewing") {
        return null;
    }

    return (
        <Text tone="muted">
            {` · ${String(flow.spanCount)} spans · ${String(flow.hops.length)} hops`}
        </Text>
    );
};

FinanceInfraTraceStatusCounts.displayName = "FinanceInfraTraceStatusCounts";

export { FinanceInfraTraceStatusCounts };
