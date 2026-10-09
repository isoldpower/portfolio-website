import type { FC, ReactNode } from "react";


interface FinanceInfraGatewayNodesProps {
    children: ReactNode;
}

const FinanceInfraGatewayNodes: FC<FinanceInfraGatewayNodesProps> = ({ children }) => (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6">
        {children}
    </div>
);

FinanceInfraGatewayNodes.displayName = "FinanceInfraGatewayNodes";

export { FinanceInfraGatewayNodes };
export type { FinanceInfraGatewayNodesProps };
