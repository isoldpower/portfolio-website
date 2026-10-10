import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceTraceStatus } from "@entities/integration/model";
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
        <span className="min-w-0 flex-1 truncate text-foreground">
            {DRAWER_HEADLINES[flow.status]}
            {flow.status === "tracing" && (
                <span className="text-muted">{` · ${String(flow.hops.length)} hops`}</span>
            )}
        </span>
    );
};

FinanceInfraTraceDrawerHeadline.displayName = "FinanceInfraTraceDrawerHeadline";

export { FinanceInfraTraceDrawerHeadline };
