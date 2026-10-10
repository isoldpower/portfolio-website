import type { FinanceTraceSummary } from "@entities/integration/model";
import type { FC } from "react";


const TIME_FORMAT: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
};

interface FinanceInfraTraceSelectorChipMetaProps {
    trace: FinanceTraceSummary;
}

const FinanceInfraTraceSelectorChipMeta: FC<FinanceInfraTraceSelectorChipMetaProps> = ({ trace }) => (
    <span className="text-subtle">
        {`${new Date(trace.startedAtMs).toLocaleTimeString([], TIME_FORMAT)} · ${String(trace.spanCount)}`}
    </span>
);

FinanceInfraTraceSelectorChipMeta.displayName = "FinanceInfraTraceSelectorChipMeta";

export { FinanceInfraTraceSelectorChipMeta };
export type { FinanceInfraTraceSelectorChipMetaProps };
