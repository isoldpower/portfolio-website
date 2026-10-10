import type { FC } from "react";


interface FinanceInfraTraceDrawerHintProps {
    children: string;
}

const FinanceInfraTraceDrawerHint: FC<FinanceInfraTraceDrawerHintProps> = ({ children }) => (
    <span className="hidden shrink-0 text-muted sm:inline">{children}</span>
);

FinanceInfraTraceDrawerHint.displayName = "FinanceInfraTraceDrawerHint";

export { FinanceInfraTraceDrawerHint };
export type { FinanceInfraTraceDrawerHintProps };
