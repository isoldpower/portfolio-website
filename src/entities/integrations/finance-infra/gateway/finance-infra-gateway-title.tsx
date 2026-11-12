import { Overline } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


interface FinanceInfraGatewayTitleProps {
    children: string;
}

const FinanceInfraGatewayTitle: FC<FinanceInfraGatewayTitleProps> = ({ children }) => (
    <Overline as="h4" tone="accent" className="self-center [writing-mode:vertical-rl]">
        {children}
    </Overline>
);

FinanceInfraGatewayTitle.displayName = "FinanceInfraGatewayTitle";

export { FinanceInfraGatewayTitle };
export type { FinanceInfraGatewayTitleProps };
