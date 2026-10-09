import type { FinanceTopologyNode } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraGatewayExternalProps {
    nodes: FinanceTopologyNode[];
    children: (node: FinanceTopologyNode) => ReactNode;
}

const FinanceInfraGatewayExternal: FC<FinanceInfraGatewayExternalProps> = ({ nodes, children }) => {
    if (nodes.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-2 rounded-md border border-external/40 bg-external/[0.06] p-1.5">
            {nodes.map(children)}
        </div>
    );
};

FinanceInfraGatewayExternal.displayName = "FinanceInfraGatewayExternal";

export { FinanceInfraGatewayExternal };
export type { FinanceInfraGatewayExternalProps };
