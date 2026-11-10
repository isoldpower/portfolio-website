import { MetaText } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


interface FinanceInfraNodeTechnologyProps {
    children: string;
}

const FinanceInfraNodeTechnology: FC<FinanceInfraNodeTechnologyProps> = ({ children }) => (
    <MetaText as="div" truncate>
        {children}
    </MetaText>
);

FinanceInfraNodeTechnology.displayName = "FinanceInfraNodeTechnology";

export { FinanceInfraNodeTechnology };
export type { FinanceInfraNodeTechnologyProps };
