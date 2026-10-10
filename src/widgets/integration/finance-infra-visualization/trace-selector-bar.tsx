import { FinanceInfraCanvasTraceSelector } from "@entities/integration/finance-infra";

import type { FC } from "react";


const TraceSelectorBar: FC = () => {
    return (
        <FinanceInfraCanvasTraceSelector label="Recent requests">
            <FinanceInfraCanvasTraceSelector.Row title="Live">
                <FinanceInfraCanvasTraceSelector.Chip trace={null}>
                    <FinanceInfraCanvasTraceSelector.ChipLiveDot />
                    Latest request
                </FinanceInfraCanvasTraceSelector.Chip>
            </FinanceInfraCanvasTraceSelector.Row>
            <FinanceInfraCanvasTraceSelector.Row title="Mutations">
                <FinanceInfraCanvasTraceSelector.Traces
                    kind="mutation"
                    placeholder="No mutations yet · create or edit something in the app"
                >
                    {(trace) => (
                        <FinanceInfraCanvasTraceSelector.Chip key={trace.traceId} trace={trace}>
                            <FinanceInfraCanvasTraceSelector.ChipRoute>
                                {trace.label}
                            </FinanceInfraCanvasTraceSelector.ChipRoute>
                            <FinanceInfraCanvasTraceSelector.ChipMeta trace={trace} />
                        </FinanceInfraCanvasTraceSelector.Chip>
                    )}
                </FinanceInfraCanvasTraceSelector.Traces>
            </FinanceInfraCanvasTraceSelector.Row>
            <FinanceInfraCanvasTraceSelector.Row title="Queries">
                <FinanceInfraCanvasTraceSelector.Traces
                    kind="query"
                    placeholder="No queries yet · open any page in the app"
                >
                    {(trace) => (
                        <FinanceInfraCanvasTraceSelector.Chip key={trace.traceId} trace={trace}>
                            <FinanceInfraCanvasTraceSelector.ChipRoute>
                                {trace.label}
                            </FinanceInfraCanvasTraceSelector.ChipRoute>
                            <FinanceInfraCanvasTraceSelector.ChipMeta trace={trace} />
                        </FinanceInfraCanvasTraceSelector.Chip>
                    )}
                </FinanceInfraCanvasTraceSelector.Traces>
            </FinanceInfraCanvasTraceSelector.Row>
        </FinanceInfraCanvasTraceSelector>
    );
};


export { TraceSelectorBar };
