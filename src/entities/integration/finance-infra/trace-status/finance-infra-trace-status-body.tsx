import type { FC, ReactNode } from "react";


interface FinanceInfraTraceStatusBodyProps {
    children: ReactNode;
}

const FinanceInfraTraceStatusBody: FC<FinanceInfraTraceStatusBodyProps> = ({ children }) => (
    <span className="flex min-w-0 flex-col">{children}</span>
);

FinanceInfraTraceStatusBody.displayName = "FinanceInfraTraceStatusBody";

export { FinanceInfraTraceStatusBody };
export type { FinanceInfraTraceStatusBodyProps };
