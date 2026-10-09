import { cn } from "@shared/lib/utilities";

import { useCanvasNode } from "./context/use-canvas-node.ts";
import { FinanceInfraNodeDetails } from "./node/finance-infra-node-details.tsx";
import { FinanceInfraNodeIcon } from "./node/finance-infra-node-icon.tsx";
import { FinanceInfraNodeName } from "./node/finance-infra-node-name.tsx";
import { FinanceInfraNodeTechnology } from "./node/finance-infra-node-technology.tsx";

import type { FinanceInfraNodeDetailsProps } from "./node/finance-infra-node-details.tsx";
import type { FinanceInfraNodeIconProps } from "./node/finance-infra-node-icon.tsx";
import type { FinanceInfraNodeNameProps } from "./node/finance-infra-node-name.tsx";
import type { FinanceInfraNodeTechnologyProps } from "./node/finance-infra-node-technology.tsx";
import type { FinanceInfraEmphasis, FinanceTopologyNode } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


const EMPHASIS_CLASSES: Record<FinanceInfraEmphasis, string> = {
    default: "border-foreground/15",
    active: "border-accent shadow-sm",
    muted: "border-foreground/10 opacity-40",
};

interface FinanceInfraCanvasNodeProps {
    node: FinanceTopologyNode;
    children: ReactNode;
}

type FinanceInfraCanvasNodeObject = FC<FinanceInfraCanvasNodeProps> & {
    Icon: FC<FinanceInfraNodeIconProps>;
    Details: FC<FinanceInfraNodeDetailsProps>;
    Name: FC<FinanceInfraNodeNameProps>;
    Technology: FC<FinanceInfraNodeTechnologyProps>;
};

const FinanceInfraCanvasNode: FinanceInfraCanvasNodeObject = ({ node, children }) => {
    const { emphasis, ...bindings } = useCanvasNode(node.id);

    return (
        <div
            tabIndex={0}
            title={node.description}
            data-node-id={node.id}
            data-node-type={node.type}
            className={cn(
                "relative z-10 flex min-w-0 items-center gap-2 rounded-md border bg-background px-2 py-1.5",
                "outline-none transition-[opacity,border-color,box-shadow] duration-200",
                "focus-visible:ring-2 focus-visible:ring-accent/40",
                EMPHASIS_CLASSES[emphasis]
            )}
            {...bindings}
        >
            {children}
        </div>
    );
};

FinanceInfraCanvasNode.Icon = FinanceInfraNodeIcon;
FinanceInfraCanvasNode.Details = FinanceInfraNodeDetails;
FinanceInfraCanvasNode.Name = FinanceInfraNodeName;
FinanceInfraCanvasNode.Technology = FinanceInfraNodeTechnology;
FinanceInfraCanvasNode.displayName = "FinanceInfraCanvasNode";

export { FinanceInfraCanvasNode };
export type { FinanceInfraCanvasNodeProps };
