import { PlainText } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface FinanceInfraTraceStatusBodyProps {
    children: ReactNode;
}

const FinanceInfraTraceStatusBody: FC<FinanceInfraTraceStatusBodyProps> = ({ children }) => (
    <PlainText className="flex min-w-0 flex-col">{children}</PlainText>
);

FinanceInfraTraceStatusBody.displayName = "FinanceInfraTraceStatusBody";

export { FinanceInfraTraceStatusBody };
export type { FinanceInfraTraceStatusBodyProps };
