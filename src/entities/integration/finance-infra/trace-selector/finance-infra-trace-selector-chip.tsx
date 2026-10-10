import { cn } from "@shared/lib/utilities";

import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceTraceSummary } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraTraceSelectorChipProps {
    trace: FinanceTraceSummary | null;
    children: ReactNode;
}

const FinanceInfraTraceSelectorChip: FC<FinanceInfraTraceSelectorChipProps> = ({ trace, children }) => {
    const { flow } = useFinanceInfraCanvas();
    const isSelected = trace === null
        ? flow.isFollowingLatest
        : !flow.isFollowingLatest && flow.traceId === trace.traceId;

    return (
        <button
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => { flow.selectTrace(trace?.traceId ?? null); }}
            className={cn(
                "flex shrink-0 cursor-pointer items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs",
                "outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent/40",
                isSelected
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-foreground/15 text-muted hover:border-foreground/30 hover:text-foreground"
            )}
        >
            {trace?.hasError === true && <span className="size-1.5 rounded-full bg-negative" />}
            {children}
        </button>
    );
};

FinanceInfraTraceSelectorChip.displayName = "FinanceInfraTraceSelectorChip";

export { FinanceInfraTraceSelectorChip };
export type { FinanceInfraTraceSelectorChipProps };
