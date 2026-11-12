import { resolveNodeIcon } from "@entities/integrations/visual-map";

import type { FinanceNodeType } from "@entities/integrations/model";
import type { FC } from "react";


interface FinanceInfraNodeIconProps {
    type: FinanceNodeType;
}

const FinanceInfraNodeIcon: FC<FinanceInfraNodeIconProps> = ({ type }) => {
    const NodeIcon = resolveNodeIcon(type);

    return (
        <NodeIcon size={14} className="shrink-0 text-muted" />
    );
};

FinanceInfraNodeIcon.displayName = "FinanceInfraNodeIcon";

export { FinanceInfraNodeIcon };
export type { FinanceInfraNodeIconProps };
