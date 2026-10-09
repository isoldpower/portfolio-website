import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceInfraLaneLayout } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraSectionEdgeLaneProps {
    children: (lane: FinanceInfraLaneLayout) => ReactNode;
}

const FinanceInfraSectionEdgeLane: FC<FinanceInfraSectionEdgeLaneProps> = ({ children }) => {
    const { layout } = useFinanceInfraCanvas();

    if (layout.edge === undefined) {
        return null;
    }

    return (
        <div className="shrink-0">
            {children(layout.edge)}
        </div>
    );
};

FinanceInfraSectionEdgeLane.displayName = "FinanceInfraSectionEdgeLane";

export { FinanceInfraSectionEdgeLane };
export type { FinanceInfraSectionEdgeLaneProps };
