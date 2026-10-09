import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceTopologyNode } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraSectionClientNodesProps {
    children: (node: FinanceTopologyNode) => ReactNode;
}

const FinanceInfraSectionClientNodes: FC<FinanceInfraSectionClientNodesProps> = ({ children }) => {
    const { layout } = useFinanceInfraCanvas();

    return (
        <div className="flex flex-1 flex-col justify-center gap-3">
            {layout.client.map(children)}
        </div>
    );
};

FinanceInfraSectionClientNodes.displayName = "FinanceInfraSectionClientNodes";

export { FinanceInfraSectionClientNodes };
export type { FinanceInfraSectionClientNodesProps };
