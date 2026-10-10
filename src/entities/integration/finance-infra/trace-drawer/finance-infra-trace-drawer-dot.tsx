import { resolveTraceStatusDotClass } from "@entities/integration/visual-map";
import { cn } from "@shared/lib/utilities";

import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FC } from "react";


const FinanceInfraTraceDrawerDot: FC = () => {
    const { flow } = useFinanceInfraCanvas();

    return <span className={cn("size-2 shrink-0 rounded-full", resolveTraceStatusDotClass(flow.status))} />;
};

FinanceInfraTraceDrawerDot.displayName = "FinanceInfraTraceDrawerDot";

export { FinanceInfraTraceDrawerDot };
