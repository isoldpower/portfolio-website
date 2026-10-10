import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceTraceStatus } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


const STATUS_HEADLINES: Record<FinanceTraceStatus, string> = {
    idle: "Live tracing starts once the demo loads",
    connecting: "Connecting to the live trace stream…",
    waiting: "Listening · use the app above to send a request",
    tracing: "Tracing the latest request",
    viewing: "Viewing an earlier request",
    error: "Live trace stream is unavailable",
};

interface FinanceInfraTraceStatusHeadlineProps {
    children?: ReactNode;
}

const FinanceInfraTraceStatusHeadline: FC<FinanceInfraTraceStatusHeadlineProps> = ({ children }) => {
    const { flow } = useFinanceInfraCanvas();

    return (
        <span className="text-foreground">
            {STATUS_HEADLINES[flow.status]}
            {children}
        </span>
    );
};

FinanceInfraTraceStatusHeadline.displayName = "FinanceInfraTraceStatusHeadline";

export { FinanceInfraTraceStatusHeadline };
export type { FinanceInfraTraceStatusHeadlineProps };
