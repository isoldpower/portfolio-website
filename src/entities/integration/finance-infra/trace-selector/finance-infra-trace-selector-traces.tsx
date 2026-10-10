import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceTraceKind, FinanceTraceSummary } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraTraceSelectorTracesProps {
    kind: FinanceTraceKind;
    placeholder: string;
    children: (trace: FinanceTraceSummary) => ReactNode;
}

const FinanceInfraTraceSelectorTraces: FC<FinanceInfraTraceSelectorTracesProps> = ({ kind, placeholder, children }) => {
    const { flow } = useFinanceInfraCanvas();
    const traces = flow.traceGroups[kind];

    if (traces.length === 0) {
        return <span className="text-xs text-subtle">{placeholder}</span>;
    }

    return <>{traces.map(children)}</>;
};

FinanceInfraTraceSelectorTraces.displayName = "FinanceInfraTraceSelectorTraces";

export { FinanceInfraTraceSelectorTraces };
export type { FinanceInfraTraceSelectorTracesProps };
