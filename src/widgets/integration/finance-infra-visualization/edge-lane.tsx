import { FinanceInfraCanvasGateway } from "@entities/integration/finance-infra";

import { GatewayServiceNode } from "./gateway-service-node.tsx";

import type { LaneRenderer } from "./types.ts";


const EdgeLane: LaneRenderer = ({ lane }) => {
    return (
        <FinanceInfraCanvasGateway>
            <FinanceInfraCanvasGateway.Title>
                {lane.title}
            </FinanceInfraCanvasGateway.Title>
            <FinanceInfraCanvasGateway.Body>
                <FinanceInfraCanvasGateway.Nodes>
                    {lane.services.map((node) => (
                        <GatewayServiceNode key={node.id} node={node} />
                    ))}
                    {lane.storages.map((node) => (
                        <GatewayServiceNode key={node.id} node={node} />
                    ))}
                    {lane.messaging.map((node) => (
                        <GatewayServiceNode key={node.id} node={node} />
                    ))}
                </FinanceInfraCanvasGateway.Nodes>
                <FinanceInfraCanvasGateway.External nodes={lane.external}>
                    {(node) => (
                        <GatewayServiceNode key={node.id} node={node} />
                    )}
                </FinanceInfraCanvasGateway.External>
            </FinanceInfraCanvasGateway.Body>
        </FinanceInfraCanvasGateway>
    );
};


export { EdgeLane };
