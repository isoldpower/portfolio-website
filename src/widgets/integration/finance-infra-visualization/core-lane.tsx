import { FinanceInfraCanvasLane } from "@entities/integration/finance-infra";

import { LaneServiceNode } from "./lane-service-node.tsx";

import type { LaneRenderer } from "./types.ts";


const CoreLane: LaneRenderer = ({ lane }) => {
    return (
        <FinanceInfraCanvasLane>
            <FinanceInfraCanvasLane.Title>
                {lane.title}
            </FinanceInfraCanvasLane.Title>
            <FinanceInfraCanvasLane.Columns>
                <FinanceInfraCanvasLane.Column>
                    {lane.services.map((node) => (
                        <LaneServiceNode key={node.id} node={node} />
                    ))}
                </FinanceInfraCanvasLane.Column>
                <FinanceInfraCanvasLane.Column>
                    {lane.storages.map((node) => (
                        <LaneServiceNode key={node.id} node={node} />
                    ))}
                </FinanceInfraCanvasLane.Column>
                <FinanceInfraCanvasLane.Column>
                    {lane.messaging.map((node) => (
                        <LaneServiceNode key={node.id} node={node} />
                    ))}
                </FinanceInfraCanvasLane.Column>
            </FinanceInfraCanvasLane.Columns>
            <FinanceInfraCanvasLane.External nodes={lane.external}>
                {(node) => (
                    <LaneServiceNode key={node.id} node={node} />
                )}
            </FinanceInfraCanvasLane.External>
        </FinanceInfraCanvasLane>
    );
};


export { CoreLane };
