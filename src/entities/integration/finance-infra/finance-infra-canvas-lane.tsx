import { FinanceInfraLaneColumn } from "./lane/finance-infra-lane-column.tsx";
import { FinanceInfraLaneColumns } from "./lane/finance-infra-lane-columns.tsx";
import { FinanceInfraLaneTitle } from "./lane/finance-infra-lane-title.tsx";

import type { FinanceInfraLaneColumnProps } from "./lane/finance-infra-lane-column.tsx";
import type { FinanceInfraLaneColumnsProps } from "./lane/finance-infra-lane-columns.tsx";
import type { FinanceInfraLaneTitleProps } from "./lane/finance-infra-lane-title.tsx";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasLaneProps {
    children: ReactNode;
}

type FinanceInfraCanvasLaneObject = FC<FinanceInfraCanvasLaneProps> & {
    Title: FC<FinanceInfraLaneTitleProps>;
    Columns: FC<FinanceInfraLaneColumnsProps>;
    Column: FC<FinanceInfraLaneColumnProps>;
};

const FinanceInfraCanvasLane: FinanceInfraCanvasLaneObject = ({ children }) => (
    <div className="rounded-lg border border-foreground/10 bg-foreground/[0.02] p-3">
        {children}
    </div>
);

FinanceInfraCanvasLane.Title = FinanceInfraLaneTitle;
FinanceInfraCanvasLane.Columns = FinanceInfraLaneColumns;
FinanceInfraCanvasLane.Column = FinanceInfraLaneColumn;
FinanceInfraCanvasLane.displayName = "FinanceInfraCanvasLane";

export { FinanceInfraCanvasLane };
export type { FinanceInfraCanvasLaneProps };
