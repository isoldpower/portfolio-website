import { Text } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


interface FinanceInfraTraceSelectorChipRouteProps {
    children: string;
}

const FinanceInfraTraceSelectorChipRoute: FC<FinanceInfraTraceSelectorChipRouteProps> = ({ children }) => (
    <Text family="mono">{children}</Text>
);

FinanceInfraTraceSelectorChipRoute.displayName = "FinanceInfraTraceSelectorChipRoute";

export { FinanceInfraTraceSelectorChipRoute };
export type { FinanceInfraTraceSelectorChipRouteProps };
