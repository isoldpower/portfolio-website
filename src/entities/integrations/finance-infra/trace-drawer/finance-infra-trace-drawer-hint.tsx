import { Text } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


interface FinanceInfraTraceDrawerHintProps {
    children: string;
}

const FinanceInfraTraceDrawerHint: FC<FinanceInfraTraceDrawerHintProps> = ({ children }) => (
    <Text tone="muted" className="hidden shrink-0 md:inline">{children}</Text>
);

FinanceInfraTraceDrawerHint.displayName = "FinanceInfraTraceDrawerHint";

export { FinanceInfraTraceDrawerHint };
export type { FinanceInfraTraceDrawerHintProps };
