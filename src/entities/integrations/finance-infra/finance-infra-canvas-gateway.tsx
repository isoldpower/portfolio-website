import { FinanceInfraGatewayBody } from "./gateway/finance-infra-gateway-body.tsx";
import { FinanceInfraGatewayExternal } from "./gateway/finance-infra-gateway-external.tsx";
import { FinanceInfraGatewayNodes } from "./gateway/finance-infra-gateway-nodes.tsx";
import { FinanceInfraGatewayTitle } from "./gateway/finance-infra-gateway-title.tsx";

import type { FinanceInfraGatewayBodyProps } from "./gateway/finance-infra-gateway-body.tsx";
import type { FinanceInfraGatewayExternalProps } from "./gateway/finance-infra-gateway-external.tsx";
import type { FinanceInfraGatewayNodesProps } from "./gateway/finance-infra-gateway-nodes.tsx";
import type { FinanceInfraGatewayTitleProps } from "./gateway/finance-infra-gateway-title.tsx";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasGatewayProps {
    children: ReactNode;
}

type FinanceInfraCanvasGatewayObject = FC<FinanceInfraCanvasGatewayProps> & {
    Title: FC<FinanceInfraGatewayTitleProps>;
    Body: FC<FinanceInfraGatewayBodyProps>;
    Nodes: FC<FinanceInfraGatewayNodesProps>;
    External: FC<FinanceInfraGatewayExternalProps>;
};

const FinanceInfraCanvasGateway: FinanceInfraCanvasGatewayObject = ({ children }) => (
    <div className="flex h-full gap-2 rounded-lg border border-dashed border-accent/40 bg-accent/[0.04] py-3 pr-2 pl-1.5">
        {children}
    </div>
);

FinanceInfraCanvasGateway.Title = FinanceInfraGatewayTitle;
FinanceInfraCanvasGateway.Body = FinanceInfraGatewayBody;
FinanceInfraCanvasGateway.Nodes = FinanceInfraGatewayNodes;
FinanceInfraCanvasGateway.External = FinanceInfraGatewayExternal;
FinanceInfraCanvasGateway.displayName = "FinanceInfraCanvasGateway";

export { FinanceInfraCanvasGateway };
export type { FinanceInfraCanvasGatewayProps };
