import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceTopologyNode } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraSectionStreamingConnectorsProps {
    children: (node: FinanceTopologyNode) => ReactNode;
}

const FinanceInfraSectionStreamingConnectors: FC<FinanceInfraSectionStreamingConnectorsProps> = ({ children }) => {
    const { layout } = useFinanceInfraCanvas();

    return layout.streaming.connectors.map(children);
};

FinanceInfraSectionStreamingConnectors.displayName = "FinanceInfraSectionStreamingConnectors";

export { FinanceInfraSectionStreamingConnectors };
export type { FinanceInfraSectionStreamingConnectorsProps };
