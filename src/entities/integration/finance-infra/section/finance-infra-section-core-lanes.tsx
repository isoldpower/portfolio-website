import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceInfraLaneLayout } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraSectionCoreLanesProps {
    children: (lane: FinanceInfraLaneLayout) => ReactNode;
}

const FinanceInfraSectionCoreLanes: FC<FinanceInfraSectionCoreLanesProps> = ({ children }) => {
    const { layout } = useFinanceInfraCanvas();

    return (
        <div className="flex min-w-0 flex-1 flex-col gap-3">
            {layout.core.map(children)}
        </div>
    );
};

FinanceInfraSectionCoreLanes.displayName = "FinanceInfraSectionCoreLanes";

export { FinanceInfraSectionCoreLanes };
export type { FinanceInfraSectionCoreLanesProps };
