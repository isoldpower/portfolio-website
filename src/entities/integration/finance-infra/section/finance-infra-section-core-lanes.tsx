import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceInfraLaneLayout } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraSectionCoreLanesProps {
    children: (lane: FinanceInfraLaneLayout) => ReactNode;
}

const FinanceInfraSectionCoreLanes: FC<FinanceInfraSectionCoreLanesProps> = ({ children }) => {
    const { layout } = useFinanceInfraCanvas();

    return layout.core.map(children);
};

FinanceInfraSectionCoreLanes.displayName = "FinanceInfraSectionCoreLanes";

export { FinanceInfraSectionCoreLanes };
export type { FinanceInfraSectionCoreLanesProps };
