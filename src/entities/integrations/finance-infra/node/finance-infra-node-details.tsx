import type { FC, ReactNode } from "react";


interface FinanceInfraNodeDetailsProps {
    children: ReactNode;
}

const FinanceInfraNodeDetails: FC<FinanceInfraNodeDetailsProps> = ({ children }) => (
    <div className="min-w-0">
        {children}
    </div>
);

FinanceInfraNodeDetails.displayName = "FinanceInfraNodeDetails";

export { FinanceInfraNodeDetails };
export type { FinanceInfraNodeDetailsProps };
