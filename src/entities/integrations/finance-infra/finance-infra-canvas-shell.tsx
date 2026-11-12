import { useFinanceInfraCanvas } from "./context/use-finance-infra-canvas.ts";

import { FinanceInfraShellColumn } from "./shell/finance-infra-shell-column.tsx";

import type { FinanceInfraShellColumnProps } from "./shell/finance-infra-shell-column.tsx";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasShellProps {
    children: ReactNode;
}

type FinanceInfraCanvasShellObject = FC<FinanceInfraCanvasShellProps> & {
    Column: FC<FinanceInfraShellColumnProps>;
};

const FinanceInfraCanvasShell: FinanceInfraCanvasShellObject = ({ children }) => {
    const { registry } = useFinanceInfraCanvas();

    return (
        <div
            ref={registry.containerRef}
            className="relative grid grid-cols-[10fr_70fr_20fr] gap-x-6 rounded-xl border border-foreground/10 p-4"
        >
            {children}
        </div>
    );
};

FinanceInfraCanvasShell.Column = FinanceInfraShellColumn;
FinanceInfraCanvasShell.displayName = "FinanceInfraCanvasShell";

export { FinanceInfraCanvasShell };
export type { FinanceInfraCanvasShellProps };
