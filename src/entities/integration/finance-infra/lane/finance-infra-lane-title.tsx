import { Overline } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


interface FinanceInfraLaneTitleProps {
    children: string;
}

const FinanceInfraLaneTitle: FC<FinanceInfraLaneTitleProps> = ({ children }) => (
    <Overline as="h4">{children}</Overline>
);

FinanceInfraLaneTitle.displayName = "FinanceInfraLaneTitle";

export { FinanceInfraLaneTitle };
export type { FinanceInfraLaneTitleProps };
