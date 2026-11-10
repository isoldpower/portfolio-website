import type { FC, ReactNode } from "react";


interface FinanceInfraLaneColumnsProps {
    children: ReactNode;
}

const FinanceInfraLaneColumns: FC<FinanceInfraLaneColumnsProps> = ({ children }) => (
    <div className="mt-2 grid grid-cols-3 gap-x-10 gap-y-2">
        {children}
    </div>
);

FinanceInfraLaneColumns.displayName = "FinanceInfraLaneColumns";

export { FinanceInfraLaneColumns };
export type { FinanceInfraLaneColumnsProps };
