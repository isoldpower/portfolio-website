import type { FC, ReactNode } from "react";


interface FinanceInfraGatewayBodyProps {
    children: ReactNode;
}

const FinanceInfraGatewayBody: FC<FinanceInfraGatewayBodyProps> = ({ children }) => (
    <div className="flex min-w-0 flex-col gap-3 border-l border-accent/20 pl-2">
        {children}
    </div>
);

FinanceInfraGatewayBody.displayName = "FinanceInfraGatewayBody";

export { FinanceInfraGatewayBody };
export type { FinanceInfraGatewayBodyProps };
