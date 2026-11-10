import type { FC, ReactNode } from "react";


interface FinanceInfraLaneColumnProps {
    children: ReactNode;
}

const FinanceInfraLaneColumn: FC<FinanceInfraLaneColumnProps> = ({ children }) => (
    <div className="flex min-w-0 flex-col gap-2">
        {children}
    </div>
);

FinanceInfraLaneColumn.displayName = "FinanceInfraLaneColumn";

export { FinanceInfraLaneColumn };
export type { FinanceInfraLaneColumnProps };
