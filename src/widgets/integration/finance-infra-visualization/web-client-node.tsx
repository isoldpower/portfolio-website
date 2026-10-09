import { FinanceInfraCanvasNode } from "@entities/integration/finance-infra";

import type { NodeRenderer } from "./types.ts";


const WebClientTopologyNode: NodeRenderer = ({ node }) => {
    return (
        <FinanceInfraCanvasNode node={node}>
            <FinanceInfraCanvasNode.Icon type={node.type} />
            <FinanceInfraCanvasNode.Details>
                <FinanceInfraCanvasNode.Name>
                    {node.name}
                </FinanceInfraCanvasNode.Name>
                <FinanceInfraCanvasNode.Technology>
                    {node.technology}
                </FinanceInfraCanvasNode.Technology>
            </FinanceInfraCanvasNode.Details>
        </FinanceInfraCanvasNode>
    );
};


export { WebClientTopologyNode };
