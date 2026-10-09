import { Text } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


interface FinanceInfraNodeNameProps {
    children: string;
}

const FinanceInfraNodeName: FC<FinanceInfraNodeNameProps> = ({ children }) => (
    <Text as="div" size="xs" weight="semibold" leading="tight" truncate>
        {children}
    </Text>
);

FinanceInfraNodeName.displayName = "FinanceInfraNodeName";

export { FinanceInfraNodeName };
export type { FinanceInfraNodeNameProps };
