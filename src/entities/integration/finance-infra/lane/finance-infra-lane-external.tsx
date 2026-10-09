import { Overline } from "@shared/ui-toolkit/typography";

import type { FinanceTopologyNode } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraLaneExternalProps {
    nodes: FinanceTopologyNode[];
    children: (node: FinanceTopologyNode) => ReactNode;
}

const FinanceInfraLaneExternal: FC<FinanceInfraLaneExternalProps> = ({ nodes, children }) => {
    if (nodes.length === 0) {
        return null;
    }

    return (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-external/40 bg-external/[0.06] px-2 py-1.5">
            <Overline as="span" className="mr-1 text-external">External</Overline>
            {nodes.map(children)}
        </div>
    );
};

FinanceInfraLaneExternal.displayName = "FinanceInfraLaneExternal";

export { FinanceInfraLaneExternal };
export type { FinanceInfraLaneExternalProps };
