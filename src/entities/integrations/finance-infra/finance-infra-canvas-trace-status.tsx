import { Text } from "@shared/ui-toolkit/typography";

import { FinanceInfraTraceStatusBody } from "./trace-status/finance-infra-trace-status-body.tsx";
import { FinanceInfraTraceStatusCounts } from "./trace-status/finance-infra-trace-status-counts.tsx";
import { FinanceInfraTraceStatusDot } from "./trace-status/finance-infra-trace-status-dot.tsx";
import { FinanceInfraTraceStatusHeadline } from "./trace-status/finance-infra-trace-status-headline.tsx";
import { FinanceInfraTraceStatusNarrative } from "./trace-status/finance-infra-trace-status-narrative.tsx";

import type { FinanceInfraTraceStatusBodyProps } from "./trace-status/finance-infra-trace-status-body.tsx";
import type { FinanceInfraTraceStatusHeadlineProps } from "./trace-status/finance-infra-trace-status-headline.tsx";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasTraceStatusProps {
    children: ReactNode;
}

type FinanceInfraCanvasTraceStatusObject = FC<FinanceInfraCanvasTraceStatusProps> & {
    Dot: FC;
    Body: FC<FinanceInfraTraceStatusBodyProps>;
    Headline: FC<FinanceInfraTraceStatusHeadlineProps>;
    Counts: FC;
    Narrative: FC;
};

const FinanceInfraCanvasTraceStatus: FinanceInfraCanvasTraceStatusObject = ({ children }) => (
    <Text size="sm" className="flex min-h-10 items-start gap-2" aria-live="polite">
        {children}
    </Text>
);

FinanceInfraCanvasTraceStatus.Dot = FinanceInfraTraceStatusDot;
FinanceInfraCanvasTraceStatus.Body = FinanceInfraTraceStatusBody;
FinanceInfraCanvasTraceStatus.Headline = FinanceInfraTraceStatusHeadline;
FinanceInfraCanvasTraceStatus.Counts = FinanceInfraTraceStatusCounts;
FinanceInfraCanvasTraceStatus.Narrative = FinanceInfraTraceStatusNarrative;
FinanceInfraCanvasTraceStatus.displayName = "FinanceInfraCanvasTraceStatus";

export { FinanceInfraCanvasTraceStatus };
export type { FinanceInfraCanvasTraceStatusProps };
