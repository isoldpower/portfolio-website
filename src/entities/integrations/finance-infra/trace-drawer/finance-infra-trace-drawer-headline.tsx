import { Text } from "@shared/ui-toolkit/typography";

import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceTraceStatus } from "@entities/integrations/model";
import type { FC } from "react";


const DRAWER_HEADLINES: Record<FinanceTraceStatus, string> = {
    idle: "See how this app works under the hood",
    connecting: "See how this app works under the hood",
    waiting: "Every request you make is traced live",
    tracing: "Watch your last request travel through the backend",
    viewing: "Watch your request travel through the backend",
    error: "See how this app is built",
};

const FinanceInfraTraceDrawerHeadline: FC = () => {
    const { flow } = useFinanceInfraCanvas();

    return (
        <Text tone="strong" truncate className="min-w-0 flex-1">
            {DRAWER_HEADLINES[flow.status]}
            {flow.status === "tracing" && (
                <Text tone="muted">{` · ${String(flow.hops.length)} hops`}</Text>
            )}
        </Text>
    );
};

FinanceInfraTraceDrawerHeadline.displayName = "FinanceInfraTraceDrawerHeadline";

export { FinanceInfraTraceDrawerHeadline };
