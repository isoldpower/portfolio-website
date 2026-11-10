import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface FinanceInfraShellColumnProps {
    children: ReactNode;
    divided?: boolean;
}

const FinanceInfraShellColumn: FC<FinanceInfraShellColumnProps> = ({ children, divided = false }) => (
    <div className={cn("min-w-0", divided && "border-l border-dashed border-foreground/15 pl-6")}>
        {children}
    </div>
);

FinanceInfraShellColumn.displayName = "FinanceInfraShellColumn";

export { FinanceInfraShellColumn };
export type { FinanceInfraShellColumnProps };
