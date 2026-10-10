import type { FC } from "react";


interface FinanceInfraTraceSelectorChipRouteProps {
    children: string;
}

const FinanceInfraTraceSelectorChipRoute: FC<FinanceInfraTraceSelectorChipRouteProps> = ({ children }) => (
    <span className="font-mono">{children}</span>
);

FinanceInfraTraceSelectorChipRoute.displayName = "FinanceInfraTraceSelectorChipRoute";

export { FinanceInfraTraceSelectorChipRoute };
export type { FinanceInfraTraceSelectorChipRouteProps };
