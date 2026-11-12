import type { FC, ReactNode } from "react";


interface FinanceInfraSectionCoreRowProps {
    children: ReactNode;
}

const FinanceInfraSectionCoreRow: FC<FinanceInfraSectionCoreRowProps> = ({ children }) => (
    <div className="flex min-w-0 flex-1 gap-6">
        {children}
    </div>
);

FinanceInfraSectionCoreRow.displayName = "FinanceInfraSectionCoreRow";

export { FinanceInfraSectionCoreRow };
export type { FinanceInfraSectionCoreRowProps };
