import { Text } from "@shared/ui-toolkit/typography";

import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FC } from "react";


const FinanceInfraTraceStatusNarrative: FC = () => {
    const { flow } = useFinanceInfraCanvas();

    if (flow.narrative === null) {
        return null;
    }

    return (
        <Text tone="muted" truncate title={flow.narrative}>
            {flow.narrative}
        </Text>
    );
};

FinanceInfraTraceStatusNarrative.displayName = "FinanceInfraTraceStatusNarrative";

export { FinanceInfraTraceStatusNarrative };
