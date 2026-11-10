import { FinanceInfraTraceSelectorChipLiveDot } from "./trace-selector/finance-infra-trace-selector-chip-live-dot.tsx";
import { FinanceInfraTraceSelectorChipMeta } from "./trace-selector/finance-infra-trace-selector-chip-meta.tsx";
import { FinanceInfraTraceSelectorChipRoute } from "./trace-selector/finance-infra-trace-selector-chip-route.tsx";
import { FinanceInfraTraceSelectorChip } from "./trace-selector/finance-infra-trace-selector-chip.tsx";
import { FinanceInfraTraceSelectorRow } from "./trace-selector/finance-infra-trace-selector-row.tsx";
import { FinanceInfraTraceSelectorTraces } from "./trace-selector/finance-infra-trace-selector-traces.tsx";

import type { FinanceInfraTraceSelectorChipMetaProps } from "./trace-selector/finance-infra-trace-selector-chip-meta.tsx";
import type { FinanceInfraTraceSelectorChipRouteProps } from "./trace-selector/finance-infra-trace-selector-chip-route.tsx";
import type { FinanceInfraTraceSelectorChipProps } from "./trace-selector/finance-infra-trace-selector-chip.tsx";
import type { FinanceInfraTraceSelectorRowProps } from "./trace-selector/finance-infra-trace-selector-row.tsx";
import type { FinanceInfraTraceSelectorTracesProps } from "./trace-selector/finance-infra-trace-selector-traces.tsx";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasTraceSelectorProps {
    label: string;
    children: ReactNode;
}

type FinanceInfraCanvasTraceSelectorObject = FC<FinanceInfraCanvasTraceSelectorProps> & {
    Row: FC<FinanceInfraTraceSelectorRowProps>;
    Traces: FC<FinanceInfraTraceSelectorTracesProps>;
    Chip: FC<FinanceInfraTraceSelectorChipProps>;
    ChipLiveDot: FC;
    ChipRoute: FC<FinanceInfraTraceSelectorChipRouteProps>;
    ChipMeta: FC<FinanceInfraTraceSelectorChipMetaProps>;
};

const FinanceInfraCanvasTraceSelector: FinanceInfraCanvasTraceSelectorObject = ({ label, children }) => (
    <div
        role="radiogroup"
        aria-label={label}
        className="mb-3 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2"
    >
        {children}
    </div>
);

FinanceInfraCanvasTraceSelector.Row = FinanceInfraTraceSelectorRow;
FinanceInfraCanvasTraceSelector.Traces = FinanceInfraTraceSelectorTraces;
FinanceInfraCanvasTraceSelector.Chip = FinanceInfraTraceSelectorChip;
FinanceInfraCanvasTraceSelector.ChipLiveDot = FinanceInfraTraceSelectorChipLiveDot;
FinanceInfraCanvasTraceSelector.ChipRoute = FinanceInfraTraceSelectorChipRoute;
FinanceInfraCanvasTraceSelector.ChipMeta = FinanceInfraTraceSelectorChipMeta;
FinanceInfraCanvasTraceSelector.displayName = "FinanceInfraCanvasTraceSelector";

export { FinanceInfraCanvasTraceSelector };
export type { FinanceInfraCanvasTraceSelectorProps };
