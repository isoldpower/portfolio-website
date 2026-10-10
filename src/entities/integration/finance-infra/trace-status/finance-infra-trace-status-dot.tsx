import { resolveTraceStatusDotClass } from "@entities/integration/visual-map";
import { cn } from "@shared/lib/utilities";

import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FC } from "react";


const FinanceInfraTraceStatusDot: FC = () => {
    const { flow } = useFinanceInfraCanvas();

    return (
        <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", resolveTraceStatusDotClass(flow.status))} />
    );
};

FinanceInfraTraceStatusDot.displayName = "FinanceInfraTraceStatusDot";

export { FinanceInfraTraceStatusDot };
