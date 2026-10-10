import { FinanceInfraCanvasContext } from "@entities/integration/finance-infra";

import { useFinanceInfraCanvasPayload } from "./use-finance-infra-canvas-payload.ts";

import type { FinanceTopology } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasProviderProps {
    topology: FinanceTopology;
    children: ReactNode;
}

const FinanceInfraCanvasProvider: FC<FinanceInfraCanvasProviderProps> = ({ topology, children }) => {
    const canvasPayload = useFinanceInfraCanvasPayload(topology);

    return (
        <FinanceInfraCanvasContext value={canvasPayload}>
            {children}
        </FinanceInfraCanvasContext>
    );
};

export { FinanceInfraCanvasProvider };
export type { FinanceInfraCanvasProviderProps };
